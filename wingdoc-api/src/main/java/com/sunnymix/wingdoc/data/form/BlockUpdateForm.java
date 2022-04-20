package com.sunnymix.wingdoc.data.form;

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
public class BlockUpdateForm {

    private String type;

    private String text;

    private String link;

}
