package com.sunnymix.wingdoc.repo;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Mark;
import com.sunnymix.wingdoc.dao.jooq.tables.records.MarkRecord;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.io.Page;
import lombok.Getter;
import org.jooq.DSLContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.sunnymix.wingdoc.dao.jooq.Tables.MARK;

/**
 * @author sunnymix
 */
@Repository
public class MarkRepo {

    @Getter
    @Autowired
    @Qualifier("dslContext")
    private DSLContext dsl;

    public Out<List<Mark>> query() {
        List<Mark> marks = dsl
                .selectFrom(MARK)
                .orderBy(MARK.ID.desc())
                .fetchStreamInto(Mark.class)
                .collect(Collectors.toList());
        return Out.ok(Page.list(marks.size()), marks);
    }

    public Out<Boolean> add(String docId) {
        if (_exist(docId)) {
            return Out.ok(true);
        }

        _create(docId);

        return Out.ok(true);
    }

    public Out<Boolean> pin(String docId) {
        _delete(docId);
        _create(docId);
        return Out.ok(true);
    }

    private void _create(String docId) {
        MarkRecord record = new MarkRecord(null, docId);
        dsl.executeInsert(record);
    }

    public Out<Boolean> delete(String docId) {
        return Out.ok(_delete(docId));
    }

    private Mark _one(String docId) {
        return dsl
                .selectFrom(MARK)
                .where(MARK.DOC_ID.eq(docId))
                .fetchOneInto(Mark.class);
    }

    private boolean _exist(String docId) {
        return _one(docId) != null;
    }

    private boolean _delete(String docId) {
        dsl
                .deleteFrom(MARK)
                .where(MARK.DOC_ID.eq(docId))
                .execute();
        return true;
    }

}
