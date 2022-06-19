package com.sunnymix.wingdoc.data.info;

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
public class DocTaskStatsInfo {

    private String docId;

    @Builder.Default
    private Integer all = 0;

    @Builder.Default
    private Integer newCount = 0;

    @Builder.Default
    private Integer wipCount = 0;

    @Builder.Default
    private Integer okCount = 0;

    @Builder.Default
    private Integer upCount = 0;

    @Builder.Default
    private Integer delCount = 0;

    @Builder.Default
    private Integer finished = 0;

    @Builder.Default
    private Integer unfinished = 0;

}
