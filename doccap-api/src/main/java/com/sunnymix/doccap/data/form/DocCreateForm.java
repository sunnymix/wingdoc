package com.sunnymix.doccap.data.form;

import com.sunnymix.doccap.dao.jooq.tables.records.DocRecord;
import com.sunnymix.doccap.data.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author sunnymix
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DocCreateForm {

    private String title;

    private String author;

    public DocRecord toRecord() {
        return new DocRecord(
                Id.newId(),
                title,
                author
        );
    }

}
