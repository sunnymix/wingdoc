package com.sunnymix.wingdoc.data.info;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Block;
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

    private String type;

    private String text;

    private String link;

    public static BlockInfo __(Block block) {
        if (block == null) {
            return null;
        }
        return __(
                block.getId(),
                block.getDocId(),
                block.getPos(),
                block.getType(),
                block.getText(),
                block.getLink()
        );
    }

}
