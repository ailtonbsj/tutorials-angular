package br.ailtonbsj.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/upload")
@CrossOrigin({"${app.front-url}"})
public class UploadController {
    public static String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads";

    @PostMapping
    public String uploadImage(@RequestParam MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, fileName);
            Files.write(fileNameAndPath, file.getBytes());
            return fileName;
        } catch (IOException e) {
            e.printStackTrace();
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
    }
}
