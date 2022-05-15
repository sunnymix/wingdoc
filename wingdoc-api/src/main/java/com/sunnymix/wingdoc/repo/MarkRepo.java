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
                .orderBy(MARK.PIN.desc(), MARK.ID.desc())
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
        Mark maxPinMark = _maxPin();
        Integer pin = maxPinMark != null ? maxPinMark.getPin() + 1 : 1;

        Mark mark = _one(docId);

        if (mark != null) {
            if (maxPinMark != null && maxPinMark.getDocId().equals(docId)) {
                return Out.ok(true);
            }

            _updatePin(mark.getId(), pin);
        } else {
            _create(docId, pin);
        }

        return Out.ok(true);
    }

    public Out<Boolean> unpin(String docId) {
        Mark mark = _one(docId);

        if (mark != null) {
            _updatePin(mark.getId(), 0);
        }

        return Out.ok(true);
    }

    private Mark _maxPin() {
        return dsl
                .selectFrom(MARK)
                .orderBy(MARK.PIN.desc())
                .limit(1)
                .fetchOneInto(Mark.class);
    }

    private void _create(String docId, Integer pin) {
        MarkRecord record = new MarkRecord();
        record.setId(null);
        record.setDocId(docId);
        record.setPin(pin == null ? 0 : pin);
        dsl.executeInsert(record);
    }

    private void _create(String docId) {
        _create(docId, 0);
    }

    private void _updatePin(Integer id, Integer pin) {
        dsl
                .update(MARK)
                .set(MARK.PIN, pin)
                .where(MARK.ID.eq(id))
                .execute();
    }

    public Out<Boolean> delete(String docId) {
        return Out.ok(_delete(docId));
    }

    private Integer _count(String docId) {
        return dsl
                .fetchCount(MARK, MARK.DOC_ID.eq(docId));

    }

    private Mark _one(String docId) {
        return dsl
                .selectFrom(MARK)
                .where(MARK.DOC_ID.eq(docId))
                .fetchOneInto(Mark.class);
    }

    private boolean _exist(String docId) {
        return _count(docId) > 0;
    }

    private boolean _delete(String docId) {
        dsl
                .deleteFrom(MARK)
                .where(MARK.DOC_ID.eq(docId))
                .execute();
        return true;
    }

}
