package com.sunnymix.wingdoc.data.info;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Block;
import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Doc;
import lombok.Builder;
import lombok.Data;

import java.util.Map;

/**
 * @author sunnymix
 */
@Data
@Builder
public class TaskInfo {

    private String id;

    private String task;

    private String status;

    private String docId;

    private String docTitle;

    public static TaskInfo of(Block block, Doc doc) {
        TaskInfoBuilder builder = TaskInfo.builder();
        builder
                .id(block.getId())
                .task(block.getText())
                .status(block.getStatus());
        if (doc != null) {
            builder
                    .docId(doc.getId())
                    .docTitle(doc.getTitle());
        }
        return builder.build();
    }

    public static TaskInfo of(Block block, Map<String, Doc> docMap) {
        return of(block, docMap.get(block.getDocId()));
    }

}
