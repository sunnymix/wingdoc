package com.sunnymix.wingdoc.service;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Block;
import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Doc;
import com.sunnymix.wingdoc.data.info.DocTaskStatsInfo;
import com.sunnymix.wingdoc.data.info.TaskInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.data.query.DocTaskQuery;
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

    public Out<DocTaskStatsInfo> stats(DocTaskQuery query) {
        List<Block> blockList = blockRepo.queryDocTask(query).getData();
        Integer newCount = 0, wipCount = 0, okCount = 0, upCount = 0, delCount = 0;
        for (Block block : blockList) {
            if (block.getStatus().equalsIgnoreCase("new")) {
                newCount++;
            } else if (block.getStatus().equalsIgnoreCase("wip")) {
                wipCount++;
            } else if (block.getStatus().equalsIgnoreCase("ok")) {
                okCount++;
            } else if (block.getStatus().equalsIgnoreCase("up")) {
                upCount++;
            } else if (block.getStatus().equalsIgnoreCase("del")) {
                delCount++;
            }
        }
        Integer all = blockList.size();
        Integer finished = okCount + delCount;
        Integer unfinished = all - finished;
        DocTaskStatsInfo stats = DocTaskStatsInfo.builder()
                .docId(query.getDocId())
                .all(all)
                .newCount(newCount)
                .wipCount(wipCount)
                .okCount(okCount)
                .upCount(upCount)
                .delCount(delCount)
                .finished(finished)
                .unfinished(unfinished)
                .build();
        return Out.ok(stats);
    }

}
