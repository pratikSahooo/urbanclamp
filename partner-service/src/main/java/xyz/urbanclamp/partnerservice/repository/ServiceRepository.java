package xyz.urbanclamp.partnerservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import xyz.urbanclamp.partnerservice.model.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
}
