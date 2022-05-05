package com.sunnymix.wingdoc.api.controller;

import com.sunnymix.wingdoc.data.info.DocTaskStatsInfo;
import com.sunnymix.wingdoc.data.info.TaskInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.query.DocTaskQuery;
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
    public Out<List<TaskInfo>> getlist(@RequestParam(value = "docId", required = false) String docId) {
        TaskQuery query = TaskQuery.builder()
                .docId(docId)
                .build();
        return taskQueryService.query(query);
    }

    @PostMapping("/task/list")
    public Out<List<TaskInfo>> fetchList(@RequestBody TaskQuery query) {
        return taskQueryService.query(query);
    }

    @GetMapping("/task/stats")
    public Out<DocTaskStatsInfo> getStats(@RequestParam(value = "docId", required = false) String docId) {
        DocTaskQuery query = DocTaskQuery.builder()
                .docId(docId)
                .build();
        return taskQueryService.stats(query);
    }

    @PostMapping("/task/stats")
    public Out<DocTaskStatsInfo> fetchStats(@RequestBody DocTaskQuery query) {
        return taskQueryService.stats(query);
    }

}
