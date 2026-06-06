# Project History

This file tracks each generation attempt.

## Attempt 1 — 2026-06-04 [IN PROGRESS]

**Business:** The Urban Foundry, Baner
**Planned Files (44):**
- backend/src/main/java/com/theurbanfoundrybaner/dto/ErrorResponse.java
- backend/src/main/java/com/theurbanfoundrybaner/exception/GlobalExceptionHandler.java
- backend/src/main/java/com/theurbanfoundrybaner/exception/ResourceNotFoundException.java
- backend/src/main/java/com/theurbanfoundrybaner/model/Role.java
- backend/src/main/java/com/theurbanfoundrybaner/model/User.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/UserRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/service/UserService.java
- backend/src/main/java/com/theurbanfoundrybaner/util/JwtUtil.java
- backend/src/main/java/com/theurbanfoundrybaner/security/JwtAuthFilter.java
- backend/src/main/java/com/theurbanfoundrybaner/config/SecurityConfig.java
- backend/src/main/java/com/theurbanfoundrybaner/config/AdminInitializer.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/AuthRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/AuthResponse.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AuthController.java
- backend/src/main/java/com/theurbanfoundrybaner/model/MenuItemCategory.java
- backend/src/main/java/com/theurbanfoundrybaner/model/MenuItem.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/MenuItemRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/MenuItemDto.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/CreateMenuItemRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/service/MenuService.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/MenuController.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AdminMenuController.java
- backend/src/main/java/com/theurbanfoundrybaner/model/ReservationStatus.java
- backend/src/main/java/com/theurbanfoundrybaner/model/Reservation.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/ReservationRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/ReservationDto.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/CreateReservationRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/UpdateReservationStatusRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/service/ReservationService.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/ReservationController.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AdminReservationController.java
- frontend/src/api/client.ts
- frontend/src/services/authService.ts
- frontend/src/context/AuthContext.tsx
- frontend/src/hooks/useAuth.ts
- frontend/src/components/ProtectedRoute.tsx
- frontend/src/pages/LoginPage.tsx
- frontend/src/pages/AdminDashboardPage.tsx
- frontend/src/services/adminMenuService.ts
- frontend/src/pages/AdminMenuPage.tsx
- frontend/src/hooks/useAdminMenu.ts
- frontend/src/services/adminReservationService.ts
- frontend/src/pages/AdminReservationsPage.tsx
- frontend/src/hooks/useAdminReservations.ts

---

## Attempt 3 — 2026-06-06 [IN PROGRESS]

**Business:** The Urban Foundry, Baner
**Planned Files (44):**
- backend/src/main/java/com/theurbanfoundrybaner/dto/ErrorResponse.java
- backend/src/main/java/com/theurbanfoundrybaner/exception/GlobalExceptionHandler.java
- backend/src/main/java/com/theurbanfoundrybaner/exception/ResourceNotFoundException.java
- backend/src/main/java/com/theurbanfoundrybaner/model/Role.java
- backend/src/main/java/com/theurbanfoundrybaner/model/User.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/UserRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/service/UserService.java
- backend/src/main/java/com/theurbanfoundrybaner/util/JwtUtil.java
- backend/src/main/java/com/theurbanfoundrybaner/security/JwtAuthFilter.java
- backend/src/main/java/com/theurbanfoundrybaner/config/SecurityConfig.java
- backend/src/main/java/com/theurbanfoundrybaner/config/AdminInitializer.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/AuthRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/AuthResponse.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AuthController.java
- backend/src/main/java/com/theurbanfoundrybaner/model/MenuItemCategory.java
- backend/src/main/java/com/theurbanfoundrybaner/model/MenuItem.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/MenuItemRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/MenuItemDto.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/CreateMenuItemRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/service/MenuService.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/MenuController.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AdminMenuController.java
- backend/src/main/java/com/theurbanfoundrybaner/model/ReservationStatus.java
- backend/src/main/java/com/theurbanfoundrybaner/model/Reservation.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/ReservationRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/ReservationDto.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/CreateReservationRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/UpdateReservationStatusRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/service/ReservationService.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/ReservationController.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AdminReservationController.java
- frontend/src/api/client.ts
- frontend/src/services/authService.ts
- frontend/src/context/AuthContext.tsx
- frontend/src/hooks/useAuth.ts
- frontend/src/components/ProtectedRoute.tsx
- frontend/src/pages/LoginPage.tsx
- frontend/src/pages/AdminDashboardPage.tsx
- frontend/src/services/adminMenuService.ts
- frontend/src/pages/AdminMenuPage.tsx
- frontend/src/hooks/useAdminMenu.ts
- frontend/src/services/adminReservationService.ts
- frontend/src/pages/AdminReservationsPage.tsx
- frontend/src/hooks/useAdminReservations.ts

---

## Attempt 4 — 2026-06-06 [IN PROGRESS]

**Business:** The Urban Foundry, Baner
**Planned Files (44):**
- backend/src/main/java/com/theurbanfoundrybaner/dto/ErrorResponse.java
- backend/src/main/java/com/theurbanfoundrybaner/exception/GlobalExceptionHandler.java
- backend/src/main/java/com/theurbanfoundrybaner/exception/ResourceNotFoundException.java
- backend/src/main/java/com/theurbanfoundrybaner/model/Role.java
- backend/src/main/java/com/theurbanfoundrybaner/model/User.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/UserRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/service/UserService.java
- backend/src/main/java/com/theurbanfoundrybaner/util/JwtUtil.java
- backend/src/main/java/com/theurbanfoundrybaner/security/JwtAuthFilter.java
- backend/src/main/java/com/theurbanfoundrybaner/config/SecurityConfig.java
- backend/src/main/java/com/theurbanfoundrybaner/config/AdminInitializer.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/AuthRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/AuthResponse.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AuthController.java
- backend/src/main/java/com/theurbanfoundrybaner/model/MenuItemCategory.java
- backend/src/main/java/com/theurbanfoundrybaner/model/MenuItem.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/MenuItemRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/MenuItemDto.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/CreateMenuItemRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/service/MenuService.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/MenuController.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AdminMenuController.java
- backend/src/main/java/com/theurbanfoundrybaner/model/ReservationStatus.java
- backend/src/main/java/com/theurbanfoundrybaner/model/Reservation.java
- backend/src/main/java/com/theurbanfoundrybaner/repository/ReservationRepository.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/ReservationDto.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/CreateReservationRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/dto/UpdateReservationStatusRequest.java
- backend/src/main/java/com/theurbanfoundrybaner/service/ReservationService.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/ReservationController.java
- backend/src/main/java/com/theurbanfoundrybaner/controller/AdminReservationController.java
- frontend/src/api/client.ts
- frontend/src/services/authService.ts
- frontend/src/context/AuthContext.tsx
- frontend/src/hooks/useAuth.ts
- frontend/src/components/ProtectedRoute.tsx
- frontend/src/pages/LoginPage.tsx
- frontend/src/pages/AdminDashboardPage.tsx
- frontend/src/services/adminMenuService.ts
- frontend/src/pages/AdminMenuPage.tsx
- frontend/src/hooks/useAdminMenu.ts
- frontend/src/services/adminReservationService.ts
- frontend/src/pages/AdminReservationsPage.tsx
- frontend/src/hooks/useAdminReservations.ts

---
