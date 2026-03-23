package iut.mmi.webAppli;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaeRepository extends JpaRepository<Sae, Long> {

    List<Sae> findAllByOrderByNoteObtenueDesc();
}
