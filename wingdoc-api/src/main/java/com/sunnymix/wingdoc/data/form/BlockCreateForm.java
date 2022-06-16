package com.sunnymix.wingdoc.data.form;

import com.sunnymix.wingdoc.dao.jooq.tables.records.BlockRecord;
import com.sunnymix.wingdoc.data.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

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

    @Nullable
    private Integer pos;

    public BlockRecord toRecord() {
        return new BlockRecord(
                Id.newId(),
                docId,
                pos,
                "TEXT",
                "",
                text,
                "",
                ""
        );
    }

    public BlockRecord toRecord(String docId) {
        return new BlockRecord(
                Id.newId(),
                docId,
                pos,
                "TEXT",
                "",
                text,
                "",
                ""
        );
    }

}
