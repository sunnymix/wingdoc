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
            .orderBy(
                MARK.PIN.desc(),
                MARK.ID.asc()
            )
            .fetchStreamInto(Mark.class)
            .collect(Collectors.toList());
        return Out.ok(Page.list(marks.size()), marks);
    }

    public Out<Boolean> add(String docId) {
        if (_existMark(docId)) {
            return Out.ok(true);
        }

        _createMark(docId);

        return Out.ok(true);
    }

    public Out<Boolean> pin(String docId) {
        _deleteMark(docId);
        _createMark(docId, 1);
        return Out.ok(true);
    }

    public Out<Boolean> unpin(String docId) {
        _deleteMark(docId);
        _createMark(docId, 0);
        return Out.ok(true);
    }

    private void _createMark(String docId, Integer pin) {
        MarkRecord record = new MarkRecord();
        record.setId(null);
        record.setDocId(docId);
        record.setPin(pin == null ? 0 : pin);
        dsl.executeInsert(record);
    }

    private void _createMark(String docId) {
        _createMark(docId, 0);
    }

    public Out<Boolean> delete(String docId) {
        return Out.ok(_deleteMark(docId));
    }

    private Integer _count(String docId) {
        return dsl
            .fetchCount(MARK, MARK.DOC_ID.eq(docId));

    }

    private boolean _existMark(String docId) {
        return _count(docId) > 0;
    }

    private boolean _deleteMark(String docId) {
        dsl
            .deleteFrom(MARK)
            .where(MARK.DOC_ID.eq(docId))
            .execute();
        return true;
    }

}
