package com.yuj.user.repository;

import com.yuj.user.domain.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
    Optional<Token> findByUserId(Long userId);

//    "delete from Follow m where m.member_id=:memberid and m.follower_id=:followid";
//    @Query(value = "delete from Token t where t.userId=:userId")
    Long deleteByUserId(Long userId);
}
