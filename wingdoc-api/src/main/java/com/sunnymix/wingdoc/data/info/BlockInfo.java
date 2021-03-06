package com.sunnymix.wingdoc.data.info;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Block;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * @author sunnymix
 */
@Data
@AllArgsConstructor(staticName = "of")
public class BlockInfo {

    private String id;

    private String docId;

    private Integer pos;

    private String type;

    private String status;

    private String text;

    private String link;

    private String img;

    public static BlockInfo of(Block block) {
        if (block == null) {
            return null;
        }
        return BlockInfo.of(
                block.getId(),
                block.getDocId(),
                block.getPos(),
                block.getType(),
                block.getStatus(),
                block.getText(),
                block.getLink(),
                block.getImg()
        );
    }

}
