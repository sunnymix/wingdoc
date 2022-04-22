package com.sunnymix.wingdoc.api.controller;

import com.sunnymix.wingdoc.data.info.TaskInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.service.TaskQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public Out<List<TaskInfo>> list() {
        return taskQueryService.query();
    }

}
