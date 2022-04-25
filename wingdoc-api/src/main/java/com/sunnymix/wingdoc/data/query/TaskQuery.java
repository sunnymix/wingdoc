package com.sunnymix.wingdoc.data.query;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jooq.Condition;

import java.util.ArrayList;
import java.util.List;

import static com.sunnymix.wingdoc.dao.jooq.Tables.BLOCK;

/**
 * @author sunnymix
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class TaskQuery {

    @Builder.Default
    List<String> statusIn = new ArrayList<>();

    public Condition toCondition() {
        Condition cond = BLOCK.TYPE.eq("TASK");
        if (!statusIn.isEmpty()) {
            cond = cond.and(BLOCK.STATUS.in(statusIn));
        }
        return cond;
    }

}
