package com.sunnymix.wingdoc.service;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Block;
import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Doc;
import com.sunnymix.wingdoc.data.info.TaskInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.query.TaskQuery;
import com.sunnymix.wingdoc.repo.BlockRepo;
import com.sunnymix.wingdoc.repo.DocRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author sunnymix
 */
@Service
public class TaskQueryService {

    @Autowired
    private BlockRepo blockRepo;

    @Autowired
    private DocRepo docRepo;

    public Out<List<TaskInfo>> query(TaskQuery query) {
        Out<List<Block>> blockOut = blockRepo.queryTask(query);
        List<Block> blockList = blockOut.getData();
        Map<String, Doc> docMap = _getDocMap(blockList);
        List<TaskInfo> taskList = blockList.stream()
                .map(block -> TaskInfo.of(block, docMap))
                .collect(Collectors.toList());
        return Out.ok(blockOut.getPage(), taskList);
    }

    private Map<String, Doc> _getDocMap(List<Block> blockList) {
        if (blockList.isEmpty()) {
            return new HashMap<>();
        }
        List<String> docIdList = blockList.stream().map(Block::getDocId).collect(Collectors.toList());
        return docRepo.queryDocMap(docIdList);
    }

}
