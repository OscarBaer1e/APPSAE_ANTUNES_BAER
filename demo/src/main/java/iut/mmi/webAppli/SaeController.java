package iut.mmi.webAppli;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sae")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SaeController {

    private final SaeRepository saeRepository;

    public SaeController(SaeRepository saeRepository) {
        this.saeRepository = saeRepository;
    }

    /**
     * GET /api/sae — Récupère toutes les SAÉ.
     */
    @GetMapping
    public List<Sae> getAll() {
        return saeRepository.findAllByOrderByNoteObtenueDesc();
    }

    /**
     * POST /api/sae — Ajoute une nouvelle SAÉ.
     */
    @PostMapping
    public ResponseEntity<Sae> add(@RequestBody Sae sae) {
        Sae saved = saeRepository.save(sae);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
