package com.sunnymix.doccap.data.info;

import com.sunnymix.doccap.dao.jooq.tables.pojos.Block;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author sunnymix
 */
@Data
@AllArgsConstructor(staticName = "__")
public class BlockInfo {

    private String id;

    private String docId;

    private Integer pos;

    private String source;

    public static BlockInfo __(Block block) {
        if (block == null) {
            return null;
        }
        return __(
                block.getId(),
                block.getDocId(),
                block.getPos(),
                block.getSource()
        );
    }

}
