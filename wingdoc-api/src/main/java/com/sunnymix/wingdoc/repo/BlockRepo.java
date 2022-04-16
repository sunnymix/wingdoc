package com.sunnymix.wingdoc.repo;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Block;
import com.sunnymix.wingdoc.dao.jooq.tables.records.BlockRecord;
import com.sunnymix.wingdoc.data.form.BlockCreateForm;
import com.sunnymix.wingdoc.data.form.BlockUpdateForm;
import com.sunnymix.wingdoc.data.info.BlockInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.io.Page;
import lombok.Getter;
import org.jooq.DSLContext;
import org.jooq.UpdateSetFirstStep;
import org.jooq.UpdateSetMoreStep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.sunnymix.wingdoc.dao.jooq.Tables.BLOCK;

/**
 * @author sunnymix
 */
@Repository
public class BlockRepo {

    @Getter
    @Autowired
    @Qualifier("dslContext")
    private DSLContext dsl;

    public Out<List<BlockInfo>> list(String docId) {
        List<BlockInfo> blockInfoList = getDsl()
                .selectFrom(BLOCK)
                .where(BLOCK.DOC_ID.eq(docId))
                .orderBy(BLOCK.POS)
                .fetchStreamInto(Block.class)
                .map(BlockInfo::__)
                .collect(Collectors.toList());
        return Out.ok(Page.list(blockInfoList.size()), blockInfoList);
    }

    public Out<BlockInfo> findOne(String id) {
        Block block = _findOne(id);
        BlockInfo blockInfo = BlockInfo.__(block);
        return Out.ok(Page.one(), blockInfo);
    }

    private Block _findOne(String id) {
        return getDsl()
                .selectFrom(BLOCK)
                .where(BLOCK.ID.eq(id))
                .fetchOneInto(Block.class);
    }

    public Out<Boolean> update(String id, BlockUpdateForm form) {
        UpdateSetFirstStep<BlockRecord> update = getDsl().update(BLOCK);
        UpdateSetMoreStep<BlockRecord> set = null;

        if (form.getText() != null) {
            set = update.set(BLOCK.TEXT, form.getText());
        }

        if (set != null) {
            int updateResult = set.where(BLOCK.ID.eq(id))
                    .execute();
        }
        return Out.ok(true);
    }

    public Out<Boolean> delete(String id) {
        Block block = _findOne(id);
        if (block != null) {
            int deleteResult = dsl
                    .deleteFrom(BLOCK)
                    .where(BLOCK.ID.eq(id))
                    .execute();
            moveUpFromPos(block.getDocId(), block.getPos() + 1);
        }
        return Out.ok(true);
    }

    public Out<BlockInfo> create(String docId, BlockCreateForm form) {
        BlockRecord record = form.toRecord(docId);
        if (record.getPos() == null) {
            record.setPos(_docBlocksCount(docId));
        } else {
            moveDownFromPos(docId, record.getPos());
        }
        int insertResult = dsl.executeInsert(record);
        return findOne(record.getId());
    }

    private void moveUpFromPos(String docId, Integer pos) {
        int updateResult = dsl
                .update(BLOCK)
                .set(BLOCK.POS, BLOCK.POS.minus(1))
                .where(BLOCK.DOC_ID.eq(docId).and(BLOCK.POS.ge(pos)))
                .execute();
    }

    private void moveDownFromPos(String docId, Integer pos) {
        int updateResult = dsl
                .update(BLOCK)
                .set(BLOCK.POS, BLOCK.POS.add(1))
                .where(BLOCK.DOC_ID.eq(docId).and(BLOCK.POS.ge(pos)))
                .execute();
    }

    public Out<Boolean> moveUp(String id) {
        Block block = _findOne(id);
        if (block != null) {
            Block upOne = _findUpOne(block.getDocId(), block.getPos());
            if (upOne != null) {
                // 交换上下两个段落的位置：
                _updateOnePos(block.getId(), upOne.getPos());
                _updateOnePos(upOne.getId(), block.getPos());
                return Out.ok(true);
            }
        }
        return Out.ok(false);
    }

    private Block _findUpOne(String docId, Integer pos) {
        return dsl
                .selectFrom(BLOCK)
                .where(BLOCK.DOC_ID.eq(docId).and(BLOCK.POS.lessThan(pos)))
                .orderBy(BLOCK.POS.desc())
                .limit(1)
                .fetchOneInto(Block.class);
    }

    public Out<Boolean> moveDown(String id) {
        Block block = _findOne(id);
        if (block != null) {
            Block downOne = _findDownOne(block.getDocId(), block.getPos());
            if (downOne != null) {
                // 交换上下两个段落的位置：
                _updateOnePos(downOne.getId(), block.getPos());
                _updateOnePos(block.getId(), downOne.getPos());
                return Out.ok(true);
            }
        }
        return Out.ok(false);
    }

    private Block _findDownOne(String docId, Integer pos) {
        return dsl
                .selectFrom(BLOCK)
                .where(BLOCK.DOC_ID.eq(docId).and(BLOCK.POS.greaterThan(pos)))
                .orderBy(BLOCK.POS.asc())
                .limit(1)
                .fetchOneInto(Block.class);
    }

    private void _updateOnePos(String id, Integer pos) {
        int updateResult = dsl
                .update(BLOCK)
                .set(BLOCK.POS, pos)
                .where(BLOCK.ID.eq(id))
                .execute();
    }

    private int _docBlocksCount(String docId) {
        return dsl.fetchCount(BLOCK, BLOCK.DOC_ID.eq(docId));
    }

}
