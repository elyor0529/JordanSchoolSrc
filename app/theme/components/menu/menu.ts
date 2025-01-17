import { Menu } from './menu.model';


export const y = [
    new Menu (300, 'ثوابت النظام', '/lookups', null, 'apps',  null, true, 0),    
    new Menu (301, 'ثوابت النظام', '/lookups/index', null, 'branding_watermark',  null, false, 300),   
]
             
export const verticalMenuItems = [   
    new Menu (1, 'الصفحة الرئيسية', '/dashboard', null, 'dashboard', null, false, 0),
  /*  new Menu (992, 'Users', '/users', null, 'supervisor_account', null, false, 0), 
    new Menu (993, 'UI Features', null, null, 'computer', null, true, 0),   
    new Menu (994, 'Buttons', '/ui/buttons', null, 'keyboard', null, false, 3),  
    new Menu (995, 'Cards', '/ui/cards', null, 'card_membership', null, false, 3), 
    new Menu (996, 'Lists', '/ui/lists', null, 'list', null, false, 3), 
    new Menu (997, 'Grids', '/ui/grids', null, 'grid_on', null, false, 3), 
    new Menu (998, 'Tabs', '/ui/tabs', null, 'tab', null, false, 3), 
    new Menu (999, 'Expansion Panel', '/ui/expansion-panel', null, 'dns', null, false, 3),
    new Menu (9910, 'Chips', '/ui/chips', null, 'label', null, false, 3),
    new Menu (9911, 'Progress', '/ui/progress', null, 'data_usage', null, false, 3), 
    new Menu (9912, 'Dialog', '/ui/dialog', null, 'open_in_new', null, false, 3), 
    new Menu (9913, 'Tooltip', '/ui/tooltip', null, 'chat_bubble', null, false, 3), 
    new Menu (9914, 'Snackbar', '/ui/snack-bar', null, 'sms', null, false, 3), 
    new Menu (9915, 'Dynamic Menu', '/dynamic-menu', null, 'format_list_bulleted', null, false, 0),    
    new Menu (9916, 'Mailbox', '/mailbox', null, 'email', null, false, 0),
    new Menu (9917, 'Chat', '/chat', null, 'chat', null, false, 0),
    new Menu (9920, 'Form Controls', null, null, 'dvr', null, true, 0), 
    new Menu (9921, 'Autocomplete', '/form-controls/autocomplete', null, 'short_text', null, false, 20), 
    new Menu (9922, 'Checkbox', '/form-controls/checkbox', null, 'check_box', null, false, 20), 
    new Menu (9923, 'Datepicker', '/form-controls/datepicker', null, 'today', null, false, 20), 
    new Menu (9924, 'Form field', '/form-controls/form-field', null, 'view_stream', null, false, 20), 
    new Menu (9925, 'Input', '/form-controls/input', null, 'input', null, false, 20), 
    new Menu (9926, 'Radio button', '/form-controls/radio-button', null, 'radio_button_checked', null, false, 20), 
    new Menu (9927, 'Select', '/form-controls/select', null, 'playlist_add_check', null, false, 20), 
    new Menu (9928, 'Slider', '/form-controls/slider', null, 'tune', null, false, 20), 
    new Menu (9929, 'Slide toggle', '/form-controls/slide-toggle', null, 'star_half', null, false, 20), 
   
    new Menu (9930, 'Tables', null, null, 'view_module', null, true, 0),
    new Menu (9931, 'Basic', '/tables/basic', null, 'view_column', null, false, 30), 
    new Menu (9932, 'Paging', '/tables/paging', null, 'last_page', null, false, 30), 
    new Menu (9933, 'Sorting', '/tables/sorting', null, 'sort', null, false, 30),
    new Menu (9934, 'Filtering', '/tables/filtering', null, 'format_line_spacing', null, false, 30),
    new Menu (9935, 'Selecting', '/tables/selecting', null, 'playlist_add_check', null, false, 30),
    new Menu (9936, 'NGX DataTable', '/tables/ngx-table', null, 'view_array', null, false, 30), 
   
    new Menu (9940, 'Pages', null, null, 'library_books', null, true, 0),
    new Menu (9943, 'Login', '/login', null, 'exit_to_app', null, false, 40),    
    new Menu (9944, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu (9945, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    new Menu (9946, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu (9947, 'Error', '/error', null, 'warning', null, false, 40),
    new Menu (9948, 'Search', '/search', null, 'search', null, false, 40),
    new Menu (9949, 'Landing', '/landing', null, 'filter', null, false, 40),
    new Menu (9950, 'Schedule', '/schedule', null, 'event_note', null, false, 0),
    new Menu (9966, 'Maps', null, null, 'map', null, true, 0),
    new Menu (9967, 'Google Maps', '/maps/googlemaps', null, 'location_on', null, false, 66),
    new Menu (9968, 'Leaflet Maps', '/maps/leafletmaps', null, 'my_location', null, false, 66),
    new Menu (9970, 'Charts', null, null, 'multiline_chart', null, true, 0),
    new Menu (9971, 'Bar Charts', '/charts/bar', null, 'insert_chart', null, false, 70),
    new Menu (9972, 'Pie Charts', '/charts/pie', null, 'pie_chart', null, false, 70),
    new Menu (9973, 'Line Charts', '/charts/line', null, 'show_chart', null, false, 70),
    new Menu (9974, 'Bubble Charts', '/charts/bubble', null, 'bubble_chart', null, false, 70), 
    new Menu (9981, 'Drag & Drop', '/drag-drop', null, 'mouse', null, false, 0),  
    new Menu (9985, 'Material Icons', '/icons', null, 'insert_emoticon', null, false, 0),  
    new Menu (99140, 'Level 1', null, null, 'more_horiz', null, true, 0),
    new Menu (99141, 'Level 2', null, null, 'folder_open', null, true, 140),
    new Menu (99142, 'Level 3', null, null, 'folder_open', null, true, 141),
    new Menu (99143, 'Level 4', null, null, 'folder_open', null, true, 142),
    new Menu (99144, 'Level 5', null, 'http://themeseason.com', 'link', null, false, 143),
    new Menu (99200, 'External Link', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 0),
    new Menu (99201, 'dynamic form', '/dynamicForm', null, 'keyboard', null, false, 66),
*/
    new Menu (300, 'ثوابت النظام', '/lookups', null, 'apps',  null, true, 0),    
    new Menu (301, 'ثوابت النظام', '/lookups/index', null, 'branding_watermark',  null, false, 300), 
    new Menu (302, 'أنواع الثوابت', '/lookups/lookuptype', null, 'featured_video',  null, false, 300),
    new Menu (303,'إعدادات المدرسة','',null,'schools',null,true,0),
    new Menu (304, ' المدارس', '/schools/index', null, 'school',  null, false, 303),
    new Menu (305, ' الاقسام', '/sections/index', null, 'playlist_add',  null, false, 303),
    new Menu (306, ' الباصات', '/buses/index', null, 'directions_bus',  null, false, 303),
    new Menu (307, ' تعريف الجولات', '/tours/index', null, 'departure_board',  null, false, 303),
    new Menu (308, '  الصفوف الدراسية', '/classes/index', null, 'cast_for_education',  null, false, 303),
    //Registration Menus
    new Menu (400, '  التسجيل', '', null, 'account_box',  null, true, 0),
    new Menu (401, '  تسجيل أولياء الامور', '/parents/index', null, 'ballot',  null, false, 400),
    new Menu(402, '  تسجيل الطلاب ', '/students/index', null, 'assignment_ind', null, false, 400),
    new Menu (402, '  تثبيت الطلاب ', '/regStuds/index', null, 'playlist_add_check',  null, false, 400),
    //Admissions
    new Menu (500, '    القبول ', '', null, 'folder_shared',  null, true, 0),
    new Menu (501, '  تسجيل الطلبة الجدد ', '/admissions/index', null, 'contact_mail',  null, false, 500),

    //Financial
    new Menu (430, '  المالية', '', null, 'money',  null, true, 0),
    new Menu (431, ' بنود المالية', '/financial/finItem/index', null, 'list_alt',  null, false, 430),
    new Menu (432, '  مالية المدرسة  ', '/financial/schoolFee/index', null, 'folder_special',  null, false, 430),
    new Menu (433, '   مالية الصفوف    ', '/financial/classFee/index', null, 'featured_play_list',  null, false, 430),
    new Menu (434, '   مالية الطالب    ', '/financial/studentFee/index', null, 'recent_actors',  null, false, 430),
    new Menu (435, '    الدفعات      ', '/financial/payment/index', null, 'library_books',  null, false, 430),

    //Reports
    new Menu (600, 'التقارير ', null, null, 'library_books',  null, true, 0),
    new Menu (601, 'التقارير', '/reports/index', null, 'library_books',  null, false, 600),
    new Menu (602, 'اسماء الطلاب حسب الشعب', '/reports/ClassStudentsList', null, '555',  null, false, 600),
    new Menu (603, 'اسماء الطلاب حسب الشعب', '/reports/ClassStudentsList', null, 'library_books',  null, false, 600),

] 

export const horizontalMenuItems = [ 
    new Menu (1, 'Dashboard', '/', null, 'dashboard', null, false, 0),
    new Menu (2, 'Users', '/users', null, 'supervisor_account', null, false, 0), 
    new Menu (3, 'UI Features', null, null, 'computer', null, true, 0),   
    new Menu (4, 'Buttons', '/ui/buttons', null, 'keyboard', null, false, 3),  
    new Menu (5, 'Cards', '/ui/cards', null, 'card_membership', null, false, 3), 
    new Menu (6, 'Lists', '/ui/lists', null, 'list', null, false, 3), 
    new Menu (7, 'Grids', '/ui/grids', null, 'grid_on', null, false, 3), 
    new Menu (8, 'Tabs', '/ui/tabs', null, 'tab', null, false, 3), 
    new Menu (9, 'Expansion Panel', '/ui/expansion-panel', null, 'dns', null, false, 3), 
    new Menu (10, 'Chips', '/ui/chips', null, 'label', null, false, 3),
    new Menu (11, 'Progress', '/ui/progress', null, 'data_usage', null, false, 3), 
    new Menu (12, 'Dialog', '/ui/dialog', null, 'open_in_new', null, false, 3), 
    new Menu (13, 'Tooltip', '/ui/tooltip', null, 'chat_bubble', null, false, 3), 
    new Menu (14, 'Snackbar', '/ui/snack-bar', null, 'sms', null, false, 3),
    new Menu (16, 'Mailbox', '/mailbox', null, 'email', null, false, 40), 
    new Menu (17, 'Chat', '/chat', null, 'chat', null, false, 40), 
    new Menu (20, 'Form Controls', null, null, 'dvr', null, true, 0), 
    new Menu (21, 'Autocomplete', '/form-controls/autocomplete', null, 'short_text', null, false, 20), 
    new Menu (22, 'Checkbox', '/form-controls/checkbox', null, 'check_box', null, false, 20), 
    new Menu (23, 'Datepicker', '/form-controls/datepicker', null, 'today', null, false, 20), 
    new Menu (24, 'Form field', '/form-controls/form-field', null, 'view_stream', null, false, 20), 
    new Menu (25, 'Input', '/form-controls/input', null, 'input', null, false, 20), 
    new Menu (26, 'Radio button', '/form-controls/radio-button', null, 'radio_button_checked', null, false, 20), 
    new Menu (27, 'Select', '/form-controls/select', null, 'playlist_add_check', null, false, 20), 
    new Menu (28, 'Slider', '/form-controls/slider', null, 'tune', null, false, 20), 
    new Menu (29, 'Slide toggle', '/form-controls/slide-toggle', null, 'star_half', null, false, 20),    
    new Menu (30, 'Tables', null, null, 'view_module', null, true, 0),
    new Menu (31, 'Basic', '/tables/basic', null, 'view_column', null, false, 30), 
    new Menu (32, 'Paging', '/tables/paging', null, 'last_page', null, false, 30), 
    new Menu (33, 'Sorting', '/tables/sorting', null, 'sort', null, false, 30),
    new Menu (34, 'Filtering', '/tables/filtering', null, 'format_line_spacing', null, false, 30),
    new Menu (35, 'Selecting', '/tables/selecting', null, 'playlist_add_check', null, false, 30),
    new Menu (36, 'NGX DataTable', '/tables/ngx-table', null, 'view_array', null, false, 30),  
    new Menu (70, 'Charts', null, null, 'multiline_chart', null, true, 0),
    new Menu (71, 'Bar Charts', '/charts/bar', null, 'insert_chart', null, false, 70),
    new Menu (72, 'Pie Charts', '/charts/pie', null, 'pie_chart', null, false, 70),
    new Menu (73, 'Line Charts', '/charts/line', null, 'show_chart', null, false, 70),
    new Menu (74, 'Bubble Charts', '/charts/bubble', null, 'bubble_chart', null, false, 70),
    new Menu (81, 'Drag & Drop', '/drag-drop', null, 'mouse', null, false, 3), 
    new Menu (85, 'Material Icons', '/icons', null, 'insert_emoticon', null, false, 3),
    new Menu (40, 'Pages', null, null, 'library_books', null, true, 0),
    new Menu (43, 'Login', '/login', null, 'exit_to_app', null, false, 40),
    new Menu (44, 'Register', '/register', null, 'person_add', null, false, 40),
    new Menu (45, 'Blank', '/blank', null, 'check_box_outline_blank', null, false, 40),
    new Menu (46, 'Page Not Found', '/pagenotfound', null, 'error_outline', null, false, 40),
    new Menu (47, 'Error', '/error', null, 'warning', null, false, 40),
    new Menu (48, 'Search', '/search', null, 'search', null, false, 40),
    new Menu (49, 'Landing', '/landing', null, 'filter', null, false, 40),
    new Menu (50, 'Schedule', '/schedule', null, 'event_note', null, false, 40),
    new Menu (200, 'External Link', null, 'http://themeseason.com', 'open_in_new', '_blank', false, 40),
    new Menu (66, 'Maps', null, null, 'map', null, true, 0),
    new Menu (67, 'Google', '/maps/googlemaps', null, 'location_on', null, false, 66),
    new Menu (68, 'Leaflet', '/maps/leafletmaps', null, 'my_location', null, false, 66),
    new Menu (201, 'dynamic form', '/dynamicForm', null, 'keyboard', null, false, 66),
];
