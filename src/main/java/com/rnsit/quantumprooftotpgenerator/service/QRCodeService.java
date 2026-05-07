package com.rnsit.quantumprooftotpgenerator.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Path;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;

@Service
public class QRCodeService {

    public String generateQRCode(String secret, String username) {
        try {
            String qrData = "otpauth://totp/" + username + "?secret=" + secret;

            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix =
                    qrCodeWriter.encode(qrData, BarcodeFormat.QR_CODE, 300, 300);

            BufferedImage image =
                    new BufferedImage(300, 300, BufferedImage.TYPE_INT_RGB);

            for (int x = 0; x < 300; x++) {
                for (int y = 0; y < 300; y++) {
                    image.setRGB(
                            x,
                            y,
                            bitMatrix.get(x, y) ? 0x000000 : 0xFFFFFF
                    );
                }
            }

            String filePath = "qr_" + username + ".png";

            ImageIO.write(image, "PNG", new File(filePath));

            return "QR Code generated successfully: " + filePath;

        } catch (Exception e) {
            e.printStackTrace();
            return "QR generation failed";
        }
    }
}