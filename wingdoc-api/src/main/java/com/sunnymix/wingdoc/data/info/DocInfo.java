package com.sunnymix.wingdoc.data.info;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Doc;
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
