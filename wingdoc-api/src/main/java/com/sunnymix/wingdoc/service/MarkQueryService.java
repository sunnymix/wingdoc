package com.sunnymix.wingdoc.service;

import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Doc;
import com.sunnymix.wingdoc.dao.jooq.tables.pojos.Mark;
import com.sunnymix.wingdoc.data.info.MarkInfo;
import com.sunnymix.wingdoc.data.io.Out;
import com.sunnymix.wingdoc.repo.DocRepo;
import com.sunnymix.wingdoc.repo.MarkRepo;
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
public class MarkQueryService {

    @Autowired
    private MarkRepo markRepo;

    @Autowired
    private DocRepo docRepo;

    public Out<List<MarkInfo>> query() {
        Out<List<Mark>> marks = markRepo.query();
        Map<String, Doc> docMap = _getDocMap(marks.getData());
        List<MarkInfo> markInfos = marks.getData().stream()
                .map(mark -> MarkInfo.of(mark, docMap))
                .collect(Collectors.toList());
        return Out.ok(marks.getPage(), markInfos);
    }

    private Map<String, Doc> _getDocMap(List<Mark> marks) {
        if (marks.isEmpty()) {
            return new HashMap<>();
        }
        List<String> docIds = marks.stream().map(Mark::getDocId).collect(Collectors.toList());
        return docRepo.queryDocMap(docIds);
    }

}
