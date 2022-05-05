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
        Integer un = 0, on = 0, ok = 0, up = 0, no = 0;
        for (Block block : blockList) {
            if (block.getStatus().equalsIgnoreCase("un")) {
                un++;
            } else if (block.getStatus().equalsIgnoreCase("on")) {
                on++;
            } else if (block.getStatus().equalsIgnoreCase("ok")) {
                ok++;
            } else if (block.getStatus().equalsIgnoreCase("up")) {
                up++;
            } else if (block.getStatus().equalsIgnoreCase("no")) {
                no++;
            }
        }
        Integer all = blockList.size();
        Integer finished = ok + no;
        Integer unfinished = all - finished;
        DocTaskStatsInfo stats = DocTaskStatsInfo.builder()
                .all(all)
                .un(un)
                .on(on)
                .ok(ok)
                .up(up)
                .no(no)
                .finished(finished)
                .unfinished(unfinished)
                .build();
        return Out.ok(stats);
    }

}
