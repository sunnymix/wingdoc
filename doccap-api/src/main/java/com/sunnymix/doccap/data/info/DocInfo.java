package com.sunnymix.doccap.data.info;

import com.sunnymix.doccap.dao.jooq.tables.pojos.Doc;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author sunnymix
 */
@Data
@AllArgsConstructor(staticName = "__")
public class DocInfo {

    private String id;

    private String title;

    private String author;

    public static DocInfo __(Doc doc) {
        if (doc == null) {
            return null;
        }
        return __(
                doc.getId(),
                doc.getTitle(),
                doc.getAuthor()
        );
    }

}
