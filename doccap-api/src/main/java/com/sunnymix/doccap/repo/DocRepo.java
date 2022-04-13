package com.sunnymix.doccap.repo;

import com.sunnymix.doccap.dao.jooq.tables.pojos.Doc;
import com.sunnymix.doccap.dao.jooq.tables.records.DocRecord;
import com.sunnymix.doccap.data.form.DocCreateForm;
import com.sunnymix.doccap.data.form.DocUpdateForm;
import com.sunnymix.doccap.data.info.DocInfo;
import com.sunnymix.doccap.data.io.Out;
import com.sunnymix.doccap.data.io.Page;
import lombok.Getter;
import org.jooq.DSLContext;
import org.jooq.UpdateSetFirstStep;
import org.jooq.UpdateSetMoreStep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

import static com.sunnymix.doccap.dao.jooq.Tables.DOC;

/**
 * @author sunnymix
 */
@Repository
public class DocRepo {

    @Getter
    @Autowired
    @Qualifier("dslContext")
    private DSLContext dsl;

    public Out<List<DocInfo>> list() {
        List<DocInfo> docInfoList = getDsl()
                .selectFrom(DOC)
                .orderBy(DOC.TITLE)
                .fetchStreamInto(Doc.class)
                .map(DocInfo::__)
                .collect(Collectors.toList());
        return Out.ok(Page.list(docInfoList.size()), docInfoList);
    }

    public Out<DocInfo> create(DocCreateForm form) {
        DocRecord record = form.toRecord();
        int insertResult = dsl.executeInsert(record);
        return one(record.getId());
    }

    public Out<Boolean> update(String id, DocUpdateForm form) {
        UpdateSetFirstStep<DocRecord> update = getDsl().update(DOC);
        UpdateSetMoreStep<DocRecord> set = null;

        if (form.getTitle() != null) {
            set = update.set(DOC.TITLE, form.getTitle());
        }

        if (form.getAuthor() != null) {
            set = update.set(DOC.AUTHOR, form.getAuthor());
        }

        if (set != null) {
            int updateResult = set.where(DOC.ID.eq(id))
                    .execute();
        }

        return Out.ok(true);
    }

    public Out<DocInfo> one(String id) {
        Doc doc = getDsl()
                .selectFrom(DOC)
                .where(DOC.ID.eq(id))
                .fetchOneInto(Doc.class);
        DocInfo docInfo = DocInfo.__(doc);
        return Out.ok(Page.one(), docInfo);
    }

}
