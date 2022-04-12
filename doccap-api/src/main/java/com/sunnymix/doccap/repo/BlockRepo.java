package com.sunnymix.doccap.repo;

import com.sunnymix.doccap.dao.jooq.tables.pojos.Block;
import com.sunnymix.doccap.data.info.BlockInfo;
import com.sunnymix.doccap.data.io.Out;
import com.sunnymix.doccap.data.io.Page;
import lombok.Getter;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.sunnymix.doccap.dao.jooq.Tables.BLOCK;

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

    public Out<BlockInfo> one(String id) {
        Block block = getDsl()
                .selectFrom(BLOCK)
                .where(BLOCK.ID.eq(id))
                .fetchOneInto(Block.class);
        BlockInfo blockInfo = BlockInfo.__(block);
        return Out.ok(Page.one(), blockInfo);
    }

}
