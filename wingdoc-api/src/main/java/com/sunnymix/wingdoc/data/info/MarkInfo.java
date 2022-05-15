package com.sunnymix.wingdoc.data.info;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Doc;
import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Mark;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

/**
 * @author sunnymix
 */
@Data
@Builder
public class MarkInfo {

    private Integer id;

    private String docId;

    private Integer pin;

    private String docTitle;

    public static MarkInfo of(Mark mark,
                              Map<String, Doc> docMap) {
        MarkInfoBuilder builder = MarkInfo.builder()
                .id(mark.getId())
                .docId(mark.getDocId())
                .pin(mark.getPin());

        Doc doc = docMap.get(mark.getDocId());
        if (doc != null) {
            builder.docTitle(doc.getTitle());
        }

        return builder.build();
    }

}
