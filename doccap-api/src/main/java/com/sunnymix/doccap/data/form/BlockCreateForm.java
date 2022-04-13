package com.sunnymix.doccap.data.form;

import com.sunnymix.doccap.dao.jooq.tables.records.BlockRecord;
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
public class BlockCreateForm {

    private String docId;

    private String text;

    public BlockRecord toRecord() {
        return new BlockRecord(
                Id.newId(),
                this.docId,
                this.text,
                0
        );
    }

    public BlockRecord toRecord(String docId) {
        return new BlockRecord(
                Id.newId(),
                docId,
                this.text,
                0
        );
    }

}
