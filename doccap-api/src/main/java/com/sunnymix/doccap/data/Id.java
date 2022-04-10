package com.sunnymix.doccap.data;

import java.util.Random;
import java.util.UUID;

/**
 * @author sunnymix
 */
public class Id {

    public static final int length = 12;

    public static String newId() {
        int start = new Random().nextInt(32 - length);
        return UUID
                .randomUUID().toString().replace("-", "")
                .substring(start, start + length)
                .toLowerCase();
    }

}
