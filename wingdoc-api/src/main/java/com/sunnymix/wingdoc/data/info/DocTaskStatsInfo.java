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
    private Integer un = 0;

    @Builder.Default
    private Integer on = 0;

    @Builder.Default
    private Integer ok = 0;

    @Builder.Default
    private Integer up = 0;

    @Builder.Default
    private Integer no = 0;

    @Builder.Default
    private Integer finished = 0;

    @Builder.Default
    private Integer unfinished = 0;

}
