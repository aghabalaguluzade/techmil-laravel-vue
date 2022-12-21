<script setup>

</script>

<template>
     <nav id="sidebar" aria-label="Main Navigation">
                <!-- Side Header -->
                <div class="bg-header-dark">
                    <div class="content-header bg-white-10">
                        <!-- Logo -->
                        <a class="font-w600 text-white tracking-wide" href="index.html">
                            <span class="smini-visible">
                                D<span class="opacity-75">x</span>
                            </span>
                            <span class="smini-hidden">
                                Dash<span class="opacity-75">mix</span>
                            </span>
                        </a>
                        <!-- END Logo -->

                        <!-- Options -->
                        <div>
                            <!-- Toggle Sidebar Style -->
                            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                            <!-- Class Toggle, functionality initialized in Helpers.coreToggleClass() -->
                            <a class="js-class-toggle text-white-75" data-target="#sidebar-style-toggler" data-class="fa-toggle-off fa-toggle-on" onclick="Dashmix.layout('sidebar_style_toggle');Dashmix.layout('header_style_toggle');" href="javascript:void(0)">
                                <i class="fa fa-toggle-off" id="sidebar-style-toggler"></i>
                            </a>
                            <!-- END Toggle Sidebar Style -->

                            <!-- Close Sidebar, Visible only on mobile screens -->
                            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                            <a class="d-lg-none text-white ml-2" data-toggle="layout" data-action="sidebar_close" href="javascript:void(0)">
                                <i class="fa fa-times-circle"></i>
                            </a>
                            <!-- END Close Sidebar -->
                        </div>
                        <!-- END Options -->
                    </div>
                </div>
                <!-- END Side Header -->

                <!-- Sidebar Scrolling -->
                <div class="js-sidebar-scroll">
                    <!-- Side Navigation -->
                    <div class="content-side">
                        <ul class="nav-main">
                            <li class="nav-main-item">
                                <a class="nav-main-link active" href="be_pages_dashboard.html">
                                    <i class="nav-main-link-icon fa fa-location-arrow"></i>
                                    <router-link to="/" class="nav-main-link">Dashboard</router-link>
                                </a>
                            </li>
                            <li class="nav-main-item">
                                <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                                    <i class="nav-main-link-icon fa fa-border-all"></i>
                                    <span class="nav-main-link-name">Saytlar</span>
                                </a>
                                <ul class="nav-main-submenu">
                                    <li class="nav-main-item">
                                            <router-link to="/sites/index" class="nav-main-link">
                                                Siyahı
                                            </router-link>
                                    </li>
                                    <li class="nav-main-item">
                                            <router-link to="/sites/create" class="nav-main-link">Əlavə et</router-link>
                                    </li>
                                </ul>
                            </li>

                            <li class="nav-main-item">
                                <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                                    <i class="nav-main-link-icon fa fa-border-all"></i>
                                    <span class="nav-main-link-name">Banner</span>
                                </a>
                                <ul class="nav-main-submenu">
                                    <li class="nav-main-item">
                                         <router-link to="/banners/index" class="nav-main-link">
                                                Siyahı
                                            </router-link>
                                    </li>
                                    <li class="nav-main-item">
                                         <router-link to="/banners/create" class="nav-main-link">Əlavə et</router-link>
                                    </li>
                                </ul>
                            </li>

                            <li class="nav-main-item">
                                <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                                    <i class="nav-main-link-icon fa fa-border-all"></i>
                                    <span class="nav-main-link-name">Əlaqə</span>
                                </a>
                                <ul class="nav-main-submenu">
                                    <li class="nav-main-item">
                                        <router-link to="/contacts/index" class="nav-main-link">
                                            Siyahı
                                        </router-link>
                                    </li>
                                </ul>
                            </li>

                            <li class="nav-main-item">
                                <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                                    <i class="nav-main-link-icon fa fa-border-all"></i>
                                    <span class="nav-main-link-name">İşçilər</span>
                                </a>
                                <ul class="nav-main-submenu">
                                    <li class="nav-main-item">
                                        <router-link to="/workers/index" class="nav-main-link">
                                            Siyahı
                                        </router-link>
                                    </li>
                                    <li class="nav-main-item">
                                        <router-link to="/workers/create" class="nav-main-link">
                                            Əlavə et
                                        </router-link>
                                    </li>
                                </ul>
                            </li>

                            <li class="nav-main-item">
                                <a class="nav-main-link nav-main-link-submenu" data-toggle="submenu" aria-haspopup="true" aria-expanded="false" href="#">
                                    <i class="nav-main-link-icon fa fa-border-all"></i>
                                    <span class="nav-main-link-name">Portfolio</span>
                                </a>
                                <ul class="nav-main-submenu">
                                    <li class="nav-main-item">
                                            <router-link to="/portfolios/index" class="nav-main-link">Siyahı</router-link>
                                    </li>
                                    <li class="nav-main-item">
                                        <router-link class="nav-main-link" to="/portfolios/create">Əlavə et</router-link>
                                    </li>
                                </ul>
                            </li>
                            
                        </ul>
                    </div>
                    <!-- END Side Navigation -->
                </div>
                <!-- END Sidebar Scrolling -->
            </nav>
</template>

<style scoped>

</style>