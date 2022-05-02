package com.sunnymix.wingdoc.api.controller;

import com.sunnymix.wingdoc.data.info.TaskInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.query.TaskQuery;
import com.sunnymix.wingdoc.service.TaskQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author sunnymix
 */
@RestController
@SuppressWarnings("all")
public class TaskController {

    @Autowired
    private TaskQueryService taskQueryService;

    @GetMapping("/task/list")
    public Out<List<TaskInfo>> list(@RequestParam(value = "docId", required = false) String docId) {
        TaskQuery query = TaskQuery.builder()
                .docId(docId)
                .build();
        return taskQueryService.query(query);
    }

    @PostMapping("/task/list")
    public Out<List<TaskInfo>> query(@RequestBody TaskQuery query) {
        return taskQueryService.query(query);
    }

}
