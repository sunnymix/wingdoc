package com.sunnymix.wingdoc.common;

/**
 * @author sunnymix
 */
public class Strings {

    public static boolean isNumber(String str) {
        return str.chars().allMatch(Character::isDigit);
    }

    public static boolean isNotEmpty(String str) {
        return str != null && str.length() > 0;
    }

    public static boolean isEmpty(String str) {
        return !isNotEmpty(str);
    }

}
