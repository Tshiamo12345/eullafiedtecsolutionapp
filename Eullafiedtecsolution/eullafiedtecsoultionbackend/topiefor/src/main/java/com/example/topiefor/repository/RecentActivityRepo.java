package com.example.topiefor.repository;

import com.example.topiefor.model.RecentActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecentActivityRepo extends JpaRepository<RecentActivity,String> {


    List<RecentActivity> findAllByUserIdOrderByRecentDateDesc(String userid);

}
