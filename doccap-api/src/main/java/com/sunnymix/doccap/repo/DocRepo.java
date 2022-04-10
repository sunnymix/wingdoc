package com.sunnymix.doccap.repo;

import com.sunnymix.doccap.dao.jooq.tables.pojos.Doc;
import com.sunnymix.doccap.data.io.Out;
import lombok.Getter;
import org.jooq.DSLContext;
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

    public Out<List<Doc>> list() {
        List<Doc> docList = getDsl()
                .selectFrom(DOC)
                .orderBy(DOC.ID)
                .fetchStreamInto(Doc.class)
                .collect(Collectors.toList());
        return Out.ok(docList);
    }

}
