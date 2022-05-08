package com.sunnymix.wingdoc.data.form;

import com.sunnymix.wingdoc.dao.jooq.tables.records.MarkRecord;
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
public class MarkAddForm {

    private String docId;

    public MarkRecord toRecord() {
        MarkRecord record = new MarkRecord();
        record.setDocId(docId);
        return record;
    }

}
