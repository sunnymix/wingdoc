package com.sunnymix.wingdoc.repo;

import com.sunnymix.wingdoc.common.Strings;
import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Doc;
import com.sunnymix.wingdoc.dao.jooq.tables.records.DocRecord;
import com.sunnymix.wingdoc.data.form.DocCreateForm;
import com.sunnymix.wingdoc.data.form.DocUpdateForm;
import com.sunnymix.wingdoc.data.info.DocInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.io.Page;
import lombok.Getter;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.UpdateSetFirstStep;
import org.jooq.UpdateSetMoreStep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.sunnymix.wingdoc.dao.jooq.Tables.DOC;
import static org.jooq.impl.DSL.trueCondition;

/**
 * @author sunnymix
 */
@Repository
public class DocRepo {

    @Getter
    @Autowired
    @Qualifier("dslContext")
    private DSLContext dsl;

    public Out<List<DocInfo>> list(String title) {
        Condition cond = trueCondition();
        if (Strings.isNotEmpty(title)) {
            cond = cond.and(DOC.TITLE.eq(title.trim()));
        }
        List<DocInfo> docInfoList = getDsl()
                .selectFrom(DOC)
                .where(cond)
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

    public Map<String, Doc> queryDocMap(List<String> docIdList) {
        List<Doc> docList = dsl
                .selectFrom(DOC)
                .where(DOC.ID.in(docIdList))
                .fetchStreamInto(Doc.class)
                .collect(Collectors.toList());
        return docList.stream().collect(Collectors.toMap(Doc::getId, doc -> doc));
    }

}
