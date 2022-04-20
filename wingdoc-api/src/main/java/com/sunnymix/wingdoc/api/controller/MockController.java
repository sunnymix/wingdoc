package com.sunnymix.wingdoc.api.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;

/**
 * @author sunnymix
 */
@RestController
public class MockController {

    @GetMapping(
            value = "/mock/img/50.png",
            produces = MediaType.IMAGE_PNG_VALUE
    )
    public byte[] img50() throws Throwable {
        return Img.create(50, 50);
    }

    public static class Img {
        public static byte[] create(Integer width, Integer height) throws Throwable {
            BufferedImage img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = _g(img);
            g.setPaint(new Color(240, 240, 240));
            g.fillRect(0, 0, width, height);

            g.setPaint(new Color(80, 80, 80));
            Font font = new Font(null, Font.PLAIN, 9);
            g.setFont(font);

            FontMetrics metrics = g.getFontMetrics(font);
            String text = String.format("%s x %s", width, height);
            int textWidth = metrics.stringWidth(text);
            int textX = (width - textWidth) / 2;
            int textHeight = metrics.getHeight();
            int textY = (height - textHeight) / 2 + metrics.getAscent();

            g.drawString(text, textX, textY);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            ImageIO.write(img, "png", out);
            byte[] bytes = out.toByteArray();
            g.dispose();
            return bytes;
        }

        private static Graphics2D _g(BufferedImage img) {
            Graphics2D g = img.createGraphics();
            g.setRenderingHint(RenderingHints.KEY_ALPHA_INTERPOLATION, RenderingHints.VALUE_ALPHA_INTERPOLATION_QUALITY);
            g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
            g.setRenderingHint(RenderingHints.KEY_COLOR_RENDERING, RenderingHints.VALUE_COLOR_RENDER_QUALITY);
            g.setRenderingHint(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_ENABLE);
            g.setRenderingHint(RenderingHints.KEY_FRACTIONALMETRICS, RenderingHints.VALUE_FRACTIONALMETRICS_ON);
            g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
            g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
            g.setRenderingHint(RenderingHints.KEY_STROKE_CONTROL, RenderingHints.VALUE_STROKE_PURE);
            return g;
        }
    }

}
