package com.sunnymix.wingdoc.data.query;

import com.sunnymix.wingdoc.common.Strings;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jooq.Condition;

import static com.sunnymix.wingdoc.dao.jooq.Tables.BLOCK;

/**
 * @author sunnymix
 */
@Data
@Builder
@NoArgsConstructor(staticName = "of")
@AllArgsConstructor(staticName = "of")
public class DocTaskQuery {

    // TODO：不为空

    String docId;

    public Condition toCondition() {
        Condition cond = BLOCK.TYPE.eq("TASK");
        if (Strings.isNotEmpty(docId)) {
            cond = cond.and(BLOCK.DOC_ID.eq(docId));
        }
        return cond;
    }

}
