package com.sunnymix.doccap.data.info;

import lombok.Data;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.time.OffsetDateTime;

/**
 * @author sunnymix
 */
@Data
@RequiredArgsConstructor(staticName = "__")
public class DocInfo {

    @NonNull
    private String id;

    @NonNull
    private String name;

    @NonNull
    private String author;

    @NonNull
    private OffsetDateTime created;

    @NonNull
    private OffsetDateTime updated;

}
