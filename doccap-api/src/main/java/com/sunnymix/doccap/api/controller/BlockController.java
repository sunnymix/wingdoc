package com.sunnymix.doccap.api.controller;

import com.sunnymix.doccap.data.info.BlockInfo;
import com.sunnymix.doccap.data.io.Out;
import com.sunnymix.doccap.repo.BlockRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author sunnymix
 */
@RestController
public class BlockController {

    @Autowired
    private BlockRepo blockRepo;

    @GetMapping("/block/list/{docId}")
    public Out<List<BlockInfo>> listByDoc(@PathVariable("docId") String docId) {
        return blockRepo.list(docId);
    }

}
