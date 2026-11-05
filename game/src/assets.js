// Tìm asset: ảnh thật trong art/out/ (theo danh sách file của thư mục và art/out/anchors.json),
// thiếu thì dùng ảnh tạm trong game/placeholders/ (level 1) hoặc ảnh tạm vẽ bằng code (level 2).
// Vị trí và cỡ hiển thị đọc từ art/design-art-level<N>.md (bảng vị trí: | key | x | y | ... |).
// Server tĩnh phải liệt kê được thư mục (python -m http.server làm được), nhờ vậy không có lỗi 404 khi dò file.
// Bản build (game/tools/build_web.py -> game/dist/) đổi BUILT thành true: khi đó mọi thứ đọc từ manifest.json cạnh trang,
// không dò thư mục (dùng cho trang tĩnh như Artifact).
export const BUILT = false;

const ROOT = new URL('../', location.href).href;          // gốc dự án (game/ nằm ngay dưới)
const ART_OUT = ROOT + 'art/out/';
const PH = new URL('placeholders/', location.href).href;
const SPECS = { 1: ROOT + 'art/design-art-level1.md', 2: ROOT + 'art/design-art-level2.md', 3: ROOT + 'art/design-art-level3.md',
  4: ROOT + 'art/design-art-level4.md', 5: ROOT + 'art/design-art-level5.md', 6: ROOT + 'art/design-art-level6.md',
  7: ROOT + 'art/design-art-level7.md', 8: ROOT + 'art/design-art-level8.md',
  9: ROOT + 'art/design-art-level9.md', // L9: chưa có file (bản khối); cần có mục ở đây để dò thư mục art/out/level9/
  10: ROOT + 'art/design-art-level10.md' }; // L10: chưa có file (bản khối); cần có mục ở đây để dò thư mục art/out/level10/ // L6, L7: chưa có file (bản khối, QUY-TRINH bước 2)
const LEVELS = Object.keys(SPECS).map(Number);

// Dự phòng nếu không đọc được design-art level 1 (giá trị ở vòng 5). Level 2 có vị trí dự phòng trong level2.js.
const DEFAULT_POS = {
  l1_wall_clock_pendulum: [866, 470], l1_wall_clock_closed: [866, 182], l1_wall_clock_bird: [866, 320],
  l1_plant: [890, 1345], prop_butterfly: [960, 1080], l1_rug_flat: [512, 1055], l1_box_closed: [220, 1285],
  l1_pate_can_closed: [800, 893], l1_pate_can_open: [650, 1305], l1_pate_can_steam: [640, 1228],
  l1_sofa_cushion_bulge: [710, 900], l1_sofa_cushion_lifted: [710, 885], l1_pillow_white_idle: [308, 875],
  l1_curtain_closed: [285, 185], sua_sit_stare: [480, 1290], player_call: [490, 1445],
};

// Key theo màn: [key, thư mục]. 'common' tải ở Boot; mỗi màn chỉ tải phần của mình khi vào màn.
// Giao diện túi đồ + bong bóng suy nghĩ: cùng một file ảnh, màn nào dùng thì trải vào danh sách của màn.
const BAG_UI = [['ui_bag_bar', 'common'], ['ui_bag_slot', 'common'], ['ui_thought_bubble', 'common']];

export const KEYS = {
  common: [
    ['sua_held', 'cats'], ['sua_face_icon', 'cats'], ['sua_run', 'cats'],
    ['player_call', 'player'], ['player_scratch_head', 'player'], ['player_surprised', 'player'], ['player_shrug', 'player'],
    ['player_hands_lift', 'player'],
    ['ui_speech_bubble', 'common'], ['ui_cat_head_dark', 'common'], ['ui_question_mark', 'common'], ['ui_question_mark_white', 'common'],
    ['ui_heart', 'common'], ['ui_hand_pointer', 'common'], ['ui_hint_paw', 'common'], ['ui_sparkle', 'common'],
    ['ui_bulb_button', 'common'], ['ui_dried_fish', 'common'], ['fx_pop', 'common'], ['ui_room_arrow', 'common'], // mũi tên: chuyển phòng, chỉ mèo Lộ diện
    ['ui_pause_button', 'common'], ['ui_play_button', 'common'], ['ui_restart_button', 'common'], ['ui_home_button', 'common'],
  ],
  1: [
    ['l1_bg_living_room', 'level1'],
    ['l1_curtain_closed', 'level1'], ['l1_curtain_open', 'level1'],
    ['l1_wall_clock_closed', 'level1'], ['l1_wall_clock_open', 'level1'], ['l1_wall_clock_bird', 'level1'], ['l1_wall_clock_pendulum', 'level1'],
    ['l1_sofa_cushion_flat', 'level1'], ['l1_sofa_cushion_bulge', 'level1'],
    ['l1_pate_can_closed', 'level1'], ['l1_pate_can_open', 'level1'], ['l1_pate_can_steam', 'level1'],
    ['l1_pillow_white_idle', 'level1'], ['l1_pillow_white_flipped', 'level1'],
    ['l1_box_closed', 'level1'], ['l1_box_open_empty', 'level1'],
    ['l1_plant', 'level1'], ['prop_butterfly', 'common'],
    ['l1_rug_flat', 'level1'], ['l1_rug_curled', 'level1'],
    ['sua_sit_stare', 'cats'], ['sua_meow_up', 'cats'], ['sua_eat', 'cats'], ['sua_eat_f2', 'cats'], ['sua_tail_peek', 'cats'],
    ['player_box_on_head', 'player'],
  ],
  2: [
    ['l2_bg_bedroom', 'level2'],
    ['l2_sock_basket_full', 'level2'], ['l2_sock_basket_2', 'level2'], ['l2_sock_basket_3', 'level2'], ['l2_sock_basket_reveal', 'level2'],
    ['l2_sock_striped', 'level2'], ['l2_sock_dotted', 'level2'], ['l2_sock_white_big', 'level2'], ['l2_sock_star', 'level2'], ['l2_sock_baby', 'level2'], ['l2_sock_long', 'level2'],
    ['l2_bed_blanket_flat', 'level2'], ['l2_bed_blanket_flipped', 'level2'], ['l2_duster_peek', 'level2'], ['l2_duster', 'level2'],
    ['l2_wardrobe_closed', 'level2'], ['l2_wardrobe_open', 'level2'], ['l2_shoebox_ears', 'level2'], ['l2_shoebox_open', 'level2'], ['l2_beanie_pink_cat', 'level2'], ['l2_curtain_tie', 'level2'],
    ['l2_curtain_closed', 'level2'], ['l2_curtain_open', 'level2'],
    ['l2_pampas_vase', 'level2'], ['l2_pampas_vase_pot', 'level2'], ['l2_pampas_plume', 'level2'], ['player_sneeze', 'player'],
    ['l2_plush_cat', 'level2'], ['l2_plush_cat_fallen', 'level2'],
    ['l2_ceiling_lamp', 'level2'], ['l2_coat_hook', 'level2'], ['l2_beanie_white_idle', 'level2'], ['l2_beanie_white_floor', 'level2'],

    ['l2_slippers_cat_idle', 'level2'], ['l2_slippers_cat_after', 'level2'],
    ['l2_chair', 'level2'], ['l2_sweater_rolled', 'level2'], ['l2_sweater_unrolled', 'level2'],
    ['l2_sock_basket_one_eye', 'level2'], ['l2_sock_basket_yawn', 'level2'], ['player_wear_beanie', 'player'],
  ],
  3: [
    ['l3_bg_living_room_afternoon', 'level3'], ['l3_curtain_closed', 'level3'], ['l3_vase', 'level3'], ['l3_scissors', 'level3'],
    ['l3_gift_box_taped', 'level3'], ['l3_gift_box_open', 'level3'], ['l3_box_upside_down', 'level3'], ['l3_sua_in_box', 'level3'],
    ['l3_cat_tree', 'level3'], ['l3_pompom', 'level3'], ['l3_sofa_front', 'level3'], ['l3_table', 'level3'],
    ['l3_tree_p1', 'level3'], ['l3_tree_p2', 'level3'], ['l3_tree_p3', 'level3'],
    ['sua_peek_tongue', 'cats'], ['sua_pounce', 'cats'], ['sua_scratch_post', 'cats'], ['sua_sit_stare', 'cats'], ['sua_tail_peek', 'cats'],
    ['l1_pillow_white_idle', 'level1'], ['l1_pillow_white_flipped', 'level1'],
    ['player_point_think', 'player'], ['player_silly_laugh', 'player'],
    ['player_dangle_pompom', 'player'], ['player_curl_on_tree', 'player'], ['l3_cat_tree_player', 'level3'], // G3-30
    ['l3_sua_in_box_ears', 'level3'], ['l3_sua_in_box_peek', 'level3'],
    ...BAG_UI,
  ],
  4: [
    ['l4_bg_living', 'level4'], ['ui_map_bedroom', 'common'], ['ui_map_living', 'common'], ['ui_map_study', 'common'], ['l4_bg_bedroom', 'level4'], ['l4_bg_study', 'level4'],
    ['l4_window', 'level4'], ['l4_curtain', 'level4'], ['l4_sofa', 'level4'], ['player_reach_sofa', 'player'], // G4-40
    ['l4_stack_mattress', 'level4'], ['l4_stack_suitcase', 'level4'], ['l4_stack_pillow', 'level4'],
    ['l4_bed', 'level4'], ['l4_pillow', 'level4'], ['l4_bedside_lamp', 'level4'], ['l4_sock_stuck', 'level4'], ['l4_sock_flat', 'level4'],
    ['l4_mattress_standing', 'level4'], ['l4_mattress_fallen', 'level4'], ['l4_teddy', 'level4'],
    ['l4_bookshelf_full', 'level4'], ['l4_bookshelf_after', 'level4'], ['l4_book_single', 'level4'], ['l4_book_single_yellow', 'level4'], ['l4_book_single_mint', 'level4'], ['l4_book_stack', 'level4'],
    ['l4_desk', 'level4'], ['l4_yoga_ball', 'level4'], ['l4_suitcase_full', 'level4'], ['l4_suitcase_folded', 'level4'],
    ['l4_spill_duck_ring', 'level4'], ['l4_spill_goggles', 'level4'], ['l4_spill_slipper', 'level4'], ['l4_spill_shirt', 'level4'],
    ['sua_curtain_banana', 'cats'], ['sua_curtain_one_paw', 'cats'], ['sua_curtain_upside', 'cats'], ['sua_curtain_sleep', 'cats'],
    ['sua_curtain_sulk', 'cats'], ['sua_curl_spin', 'cats'], ['sua_land', 'cats'], ['sua_lick_paw', 'cats'],
    ['player_reach_up', 'player'], ['player_silly_laugh', 'player'],
    ...BAG_UI, ['ui_room_arrow', 'common'],
    ['fx_dust_puff', 'common'], ['fx_dust_puff_b', 'common'],
  ],
  // Level 5: bản khối (chưa có ảnh), mọi key tự vẽ khối có nhãn trong level5.js; tên key theo states-01-10.md.
  5: [
    ['l5_bg_backyard', 'level5'], ['l5_bg_alley', 'level5'], ['ui_map_yard', 'common'], ['ui_map_alley', 'common'], ['l5_cafe_window', 'level5'], ['l5_cafe_window_back', 'level5'], ['l5_cafe_window_frame', 'level5'], ['l5_vanity_table', 'level5'],
    ['l5_mirror_small', 'level5'], ['l5_mirror_placed', 'level5'], ['l5_cardboard_box', 'level5'],
    ['l5_trash_bag_idle', 'level5'], ['l5_trash_bag_after', 'level5'], ['l5_awning_down', 'level5'],
    ['l5_light_spot', 'level5'], ['l5_cart', 'level5'], ['l5_crow_idle', 'level5'], ['l5_crow_far', 'level5'],
    ['l5_drain_pipe', 'level5'], ['l5_tin_lid', 'level5'], ['l5_tin_lid_placed', 'level5'], ['l5_cd_hanging', 'level5'],
    ['l5_cd_placed', 'level5'],
    ['l5_doorstep', 'level5'], ['l5_cactus_pot', 'level5'], ['l5_cactus_flower', 'level5'], ['l5_clothesline', 'level5'], ['l5_shirt', 'level5'],
    ['l5_clothespin', 'level5'], ['l5_wind_chime', 'level5'], ['l5_slippers', 'level5'], ['l5_slippers_flipped', 'level5'],
    ['l5_bike', 'level5'], ['l5_bike_wheel', 'level5'], ['l5_puddle', 'level5'], ['l5_gecko', 'level5'], ['l5_milk_can', 'level5'],
    ['mun_eyes_dark', 'cats'], ['mun_peek_out', 'cats'], ['mun_paw_reach', 'cats'], ['mun_run', 'cats'], ['mun_pounce', 'cats'], ['mun_pin_light', 'cats'],
    ['mun_look_paw', 'cats'], ['mun_held', 'cats'], ['mun_face_icon', 'cats'], ['sua_press_window', 'cats'],
    ['player_cover_nose', 'player'],
    ...BAG_UI, ['ui_room_arrow', 'common'],
  ],
  // L6 bản khối (G6-1): nền sân sau, chuông gió và các dáng Mun có sẵn dùng lại; còn lại là khối có nhãn (level6.js).
  6: [
    ['l6_bg_backyard', 'level6'], ['l5_wind_chime', 'level5'],
    ['l6_shed', 'level6'], ['l6_shed_chimney', 'level6'], ['l6_tree', 'level6'], ['l6_bird_nest', 'level6'], ['l6_dog_house', 'level6'],
    ['l6_veggie_bed', 'level6'], ['l6_watering_can', 'level6'], ['l6_table', 'level6'], ['l6_picnic_basket_closed', 'level6'],
    ['l6_picnic_basket_open', 'level6'], ['l6_bone', 'level6'], ['l6_grilled_fish', 'level6'], ['l6_plate', 'level6'], ['l6_barrel', 'level6'], ['l6_toolbox', 'level6'],
    ['l6_crate', 'level6'], ['l6_stool', 'level6'], ['l6_glove_black_idle', 'level6'], ['l6_glove_black_fallen', 'level6'],
    ['l6_dog_bark', 'level6'], ['l6_dog_run', 'level6'], ['l6_dog_run_bone', 'level6'], ['l6_dog_house_front', 'level6'], ['l6_dog_chew', 'level6'], ['l6_dog_beg', 'level6'], ['l6_dog_belly', 'level6'],
    ['mun_roof_crouch', 'cats'], ['mun_roof_crouch_ears_up', 'cats'], ['mun_roof_edge', 'cats'], ['mun_step_down', 'cats'], ['mun_jump_up', 'cats'], ['mun_eat', 'cats'], ['mun_sit_look', 'cats'],
    ['mun_run', 'cats'], ['mun_pounce', 'cats'], ['mun_hop_down', 'cats'], ['mun_land', 'cats'], ['mun_held', 'cats'], ['mun_face_icon', 'cats'],
    ...BAG_UI,
  ],
  // L7 bản khối (G7-1..5): nền hẻm, xe ba gác, thùng gỗ, hộp đồ L6 và các dáng Mun có sẵn dùng lại;
  // còn lại là khối có nhãn (level7.js). Dáng Mun mới (ướt, gió, ngại ngùng…) chưa có ảnh thì dùng dáng cũ gần nhất.
  7: [
    ['l7_bg_alley', 'level7'], ['l5_cart', 'level5'], ['l5_wind_chime', 'level5'], ['l5_bike', 'level5'], ['l5_bike_wheel', 'level5'], ['l6_crate', 'level6'], ['l6_toolbox', 'level6'],
    ['l7_bg_shop_street', 'level7'], ['l7_bg_house_front', 'level7'], ['l7_leaf', 'level7'], ['l7_twig', 'level7'],
    ['l5_awning_down', 'level5'], ['l7_puddle', 'level7'], ['l7_branch_debris', 'level7'], ['l7_flood_strip', 'level7'],
    ['l7_plank', 'level7'], ['l7_branch', 'level7'],
    ['l7_tree_shop', 'level7'], ['l7_shop_table', 'level7'], ['l7_umbrella_closed', 'level7'], ['l7_umbrella_open', 'level7'],
    ['l7_stray_dog_scared', 'level7'], ['l7_stray_dog_inbox', 'level7'], ['l7_box_carton_open', 'level7'], ['l7_box_carton_side', 'level7'],
    ['l7_window_inside', 'level7'], ['l7_window_closed', 'level7'], ['l7_window_open', 'level7'], ['l7_window_hook', 'level7'],
    ['l7_front_door', 'level7'],
    ['mun_eyes_dark', 'cats'], ['mun_peek_out', 'cats'], ['mun_run', 'cats'], ['mun_pounce', 'cats'], ['mun_step_down', 'cats'],
    ['mun_hop_down', 'cats'], ['mun_land', 'cats'], ['mun_sit_look', 'cats'], ['mun_held', 'cats'], ['mun_face_icon', 'cats'],
    ['mun_run_b', 'cats'], ['mun_sit_wet', 'cats'], ['mun_paw_rain', 'cats'], ['mun_slip', 'cats'], ['mun_sneak', 'cats'],
    ['mun_paw_glass', 'cats'], ['mun_paw_chime', 'cats'], ['mun_shy_sill', 'cats'], ['mun_held_towel', 'cats'],
    ['player_face_icon', 'player'], ['player_back_tv', 'player'], ['player_turn_surprised', 'player'], ['player_arms_open', 'player'],
    ...BAG_UI,
  ],  // L8 Tắm cho Mun (ảnh thật A8-8): nền phòng tắm, đồ tắm, lá/bùn/ké, bọt và các dáng Mun tắm (đuôi, mí mắt là ảnh riêng).
  8: [
  ['l8_bg_bathroom', 'level8'], ['l8_mirror', 'level8'], ['l8_stool_plastic', 'level8'], ['l8_shower_hook', 'level8'], ['l8_shower_mixer', 'level8'],
  ['l8_towel_rack', 'level8'], ['l8_floor_drain', 'level8'], ['l8_duck', 'level8'],
  ['l8_leaf_a', 'level8'], ['l8_leaf_b', 'level8'], ['l8_leaf_c', 'level8'], ['l8_leaf_d', 'level8'], ['l8_twig_a', 'level8'],
  ['l8_twig_b', 'level8'], ['l8_burr', 'level8'],
  ['l8_mud_patch_a', 'level8'], ['l8_mud_patch_b', 'level8'], ['l8_mud_patch_c', 'level8'], ['l8_oil_drop', 'level8'],
  ['l8_foam_bubble_a', 'level8'], ['l8_foam_bubble_b', 'level8'], ['l8_foam_bubble_c', 'level8'],
  ['ui_bag_bar', 'common'], ['ui_bag_bar_2', 'common'], ['ui_bag_bar_1', 'common'], ['ui_bag_slot', 'common'], ['l8_tool_comb_wide', 'level8'], ['l8_tool_shower', 'level8'], ['l8_tool_shampoo', 'level8'],
  ['l8_tool_sponge', 'level8'], ['l8_tool_facecloth', 'level8'], ['l8_tool_towel', 'level8'], ['l8_tool_dryer', 'level8'], ['l8_tool_brush', 'level8'], ['l8_tool_brush_down', 'level8'],
  ['mun_bath_dirty', 'cats'], ['mun_bath_wet', 'cats'], ['mun_bath_foam', 'cats'], ['mun_bath_sneeze', 'cats'], ['mun_bath_towel', 'cats'],
  ['mun_bath_fluffy', 'cats'], ['mun_bath_sleek', 'cats'],
  ['mun_bath_lick', 'cats'], ['mun_bath_tongue', 'cats'], ['l8_icon_mun_clean', 'level8'],
  ['mun_bath_tail_dirty', 'cats'], ['mun_bath_tail_wet', 'cats'], ['mun_bath_tail_fluffy', 'cats'], ['mun_bath_tail_sleek', 'cats'], ['mun_bath_blink', 'cats'],
  ['mun_bath_blink_dirty', 'cats'], ['mun_bath_blink_wet', 'cats'], ['mun_bath_blink_fluffy', 'cats'], ['mun_bath_blink_sleek', 'cats'], ['mun_bath_blink_tongue', 'cats'],
  ['ui_emote_mun_happy', 'common'], ['ui_emote_mun_no', 'common'],
  ['mun_held', 'cats'], ['mun_face_icon', 'cats'],
  ],
  // L9 bản khối (Súp thưởng, 2026-11-02): mọi đồ và dáng mèo là khối có nhãn (level9.js), sau thay bằng ảnh cùng tên.
  9: [
    ['l9_bg_kitchen', 'level9'], ['l9_counter', 'level9'], ['l9_stove', 'level9'], ['l9_knob', 'level9'], ['l9_plate', 'level9'],
    ['l9_basin', 'level9'], ['l9_chicken_raw', 'level9'], ['l9_chicken_peeled', 'level9'], ['l9_chicken_skin', 'level9'],
    ['l9_chicken_piece', 'level9'], ['l9_board', 'level9'], ['l9_knife', 'level9'], ['l9_peeler', 'level9'], ['l9_pumpkin', 'level9'],
    ['l9_pumpkin_rind', 'level9'], ['l9_pumpkin_dice', 'level9'], ['l9_pot', 'level9'], ['l9_ladle', 'level9'], ['l9_blender', 'level9'],
    ['l9_blender_btn', 'level9'], ['l9_sieve', 'level9'], ['l9_tureen', 'level9'], ['l9_bowl', 'level9'], ['l9_paw_black', 'level9'],
    ['l9_paw_white', 'level9'], ['l9_icon_soup', 'level9'],
    ['l9_bg_end', 'level9'], ['l9_end_bowl', 'level9'], ['l9_tray', 'level9'], ['l9_tray_lid', 'level9'],
    ['mun_soup_walk', 'cats'], ['mun_soup_surprise', 'cats'], ['mun_soup_eat', 'cats'],
    ['sua_soup_walk', 'cats'], ['sua_soup_surprise', 'cats'], ['sua_soup_eat', 'cats'], ['mun_face_icon', 'cats'],
    ['sua_face_icon', 'cats'],   // G9-12: màn thưởng hiện đầu Mun và Sữa
    ['l9_pumpkin_stem', 'level9'],   // cuống bí (ảnh riêng, xoay theo quả)
    ['l9_tray_ribbon', 'level9'], ['l9_tray_bow', 'level9'],   // ruy băng, nơ hộp (ảnh riêng; chưa có ảnh thì code vẽ)
    ['l9_blender_lid', 'level9'],   // G9-14: nắp cối máy xay (chưa có ảnh: khối tạm)
    // G9-14: ảnh mới của Art: bí đã gọt + 10 miếng vỏ, lửa 2 khung, chậu nước phẳng / gợn, mũi tên gợi ý, đầu và thân mèo tách riêng
    ['l9_pumpkin_peeled', 'level9'], ['l9_pumpkin_rind_0', 'level9'], ['l9_pumpkin_rind_1', 'level9'], ['l9_pumpkin_rind_2', 'level9'], ['l9_pumpkin_rind_3', 'level9'], ['l9_pumpkin_rind_4', 'level9'], ['l9_pumpkin_rind_5', 'level9'], ['l9_pumpkin_rind_6', 'level9'], ['l9_pumpkin_rind_7', 'level9'], ['l9_pumpkin_rind_8', 'level9'], ['l9_pumpkin_rind_9', 'level9'],
    ['l9_flame_a', 'level9'], ['l9_flame_b', 'level9'], ['l9_basin_full', 'level9'], ['l9_basin_ripple', 'level9'],
    ['l9_hint_arrow_straight', 'level9'], ['l9_hint_arrow_curve', 'level9'], ['l9_hint_arrow_circle', 'level9'], ['l9_hint_tap', 'level9'],
    ['mun_soup_surprise_head', 'cats'], ['mun_soup_surprise_body', 'cats'], ['mun_soup_eat_head', 'cats'], ['mun_soup_eat_body', 'cats'], ['sua_soup_surprise_head', 'cats'], ['sua_soup_surprise_body', 'cats'], ['sua_soup_eat_head', 'cats'], ['sua_soup_eat_body', 'cats'],
    ['mun_soup_walk_0', 'cats'], ['mun_soup_walk_1', 'cats'], ['mun_soup_walk_2', 'cats'], ['mun_soup_walk_3', 'cats'], ['sua_soup_walk_0', 'cats'], ['sua_soup_walk_1', 'cats'], ['sua_soup_walk_2', 'cats'], ['sua_soup_walk_3', 'cats'],   // L9 cảnh kết: 4 khung bước đi
  ],
  // L10 bản khối (Đại chiến quái thú, 2026-11-02): mọi đồ và dáng mèo mặc đồ là khối có nhãn (level10.js); mèo thật dùng ảnh có sẵn.
  10: [
    ['l10_bg_living_kitchen', 'level10'], ['l10_shelf_left', 'level10'], ['l10_shelf_right', 'level10'], ['l10_scissors', 'level10'],
    ['l10_soup_box', 'level10'], ['l10_soup_box_open', 'level10'], ['l10_book_stack', 'level10'], ['l10_plane_fly', 'level10'], ['l10_fish_smoke', 'level10'], ['l10_plant', 'level10'],
    ['l10_sofa', 'level10'], ['l10_pillow', 'level10'], ['l10_remote', 'level10'], ['l10_remote_open', 'level10'], ['l10_table_arena', 'level10'],
    ['l10_shelf_mid', 'level10'], ['l10_vase', 'level10'], ['l10_rug_loop', 'level10'], ['l10_blocks_a', 'level10'], ['l10_blocks_b', 'level10'],
    ['l10_toy_firetruck', 'level10'],
    ['l10_ball', 'level10'], ['l10_plane', 'level10'], ['l10_battery', 'level10'],
    ['l10_fire', 'level10'],
    ['mun_gorilla_idle', 'cats'], ['mun_gorilla_block', 'cats'], ['mun_gorilla_punch', 'cats'], ['mun_gorilla_chest', 'cats'],
    ['mun_gorilla_reach', 'cats'], ['mun_gorilla_look', 'cats'], ['mun_gorilla_sniff', 'cats'], ['mun_gorilla_lick', 'cats'], ['mun_gorilla_roar', 'cats'],
    ['sua_lizard_idle', 'cats'], ['sua_lizard_fire', 'cats'], ['sua_lizard_fire_up', 'cats'], ['sua_lizard_look', 'cats'], ['sua_lizard_dodge', 'cats'],
    ['sua_lizard_roar', 'cats'], ['sua_lizard_sniff', 'cats'], ['sua_lizard_lick', 'cats'],
    ['mun_l10_eat', 'cats'], ['sua_l10_eat', 'cats'], ['mun_l10_groom', 'cats'], ['sua_l10_groom', 'cats'],
    ['mun_held', 'cats'], ['mun_face_icon', 'cats'], ['sua_face_icon', 'cats'],
    ...BAG_UI, ['ui_room_arrow', 'common'],
  ],
};
export const ALL_KEYS = Object.values(KEYS).flat();

async function listing(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return new Set();
    const html = await res.text();
    return new Set([...html.matchAll(/href="([^"?#]+)"/g)].map((m) => decodeURIComponent(m[1])));
  } catch {
    return new Set();
  }
}

async function json(url) {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

// Bảng vị trí: | Key | X | Y | Cảnh | Rộng demo |. Cột "Rộng demo" (từ level 3, D3-17) = bề rộng phần vẽ thật trong tranh demo;
// code co ảnh cho khớp bề rộng đó (fit).
function parseSpec(text) {
  const pos = {}, info = {}, fit = {};
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    let m = line.match(/^\|\s*([a-z0-9_]+)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|\s*([^|]*)\|\s*(\d+)?/);
    if (m) {
      pos[m[1]] = [Number(m[2]), Number(m[3])];
      if (m[5]) fit[m[1]] = Number(m[5]);
      continue;
    }
    m = line.match(/^\|\s*`([a-z0-9_]+)`\s*\|\s*(\w+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/);
    if (m) {
      const d = m[3].trim().match(/(rộng|cao)\s*(\d+)/);
      info[m[1]] = { folder: m[2], display: d ? { dim: d[1] === 'cao' ? 'h' : 'w', val: Number(d[2]) } : null, neo: m[5].trim() };
    }
  }
  return { pos, info, fit };
}

// Bản build: manifest.json đã có sẵn entries (url tương đối), pos, info, audio, phMeta.
async function fromManifest() {
  const m = await json(new URL('manifest.json', location.href).href);
  if (!m) throw new Error('Không đọc được manifest.json');
  const base = new URL('./', location.href).href;
  for (const e of Object.values(m.entries)) e.url = base + e.url;
  const pos = { ...m.pos, 1: { ...DEFAULT_POS, ...(m.pos[1] || {}) } };
  return { pos, info: m.info, fit: m.fit || {}, entries: m.entries, audio: new Set(m.audio), phMeta: m.phMeta || {} };
}

// Trả về { pos, info, fit, entries: {key: {url, real, ax, ay, res, auto}}, audio: Set }
export async function discover() {
  if (BUILT) return fromManifest();
  const text = (u) => fetch(u, { cache: 'no-store' }).then((r) => (r.ok ? r.text() : '')).catch(() => '');
  const [outList, ph, audioList, ...specs] = await Promise.all([
    listing(ART_OUT), json(PH + 'placeholders.json'), listing(new URL('audio/', location.href).href),
    ...LEVELS.map((n) => text(SPECS[n])),
  ]);
  const anchors = outList.has('anchors.json') ? await json(ART_OUT + 'anchors.json') : null;
  const pos = {}, fit = {};
  let info = {};
  LEVELS.forEach((n, i) => {
    const s = parseSpec(specs[i]);
    pos[n] = s.pos;
    fit[n] = s.fit;
    info = { ...s.info, ...info }; // level trước thắng khi trùng key (đồ dùng lại)
  });
  pos[1] = { ...DEFAULT_POS, ...pos[1] };
  const folders = {};
  for (const f of [...LEVELS.map((n) => 'level' + n), 'cats', 'common', 'player']) {
    folders[f] = outList.has(f + '/') ? await listing(ART_OUT + f + '/') : new Set();
  }
  const bust = '?v=' + Date.now();
  const entries = {};
  for (const [key, folder] of ALL_KEYS) {
    const file = key + '.png';
    if (folders[folder].has(file)) {
      const a = anchors && anchors[key];
      entries[key] = a
        ? { url: ART_OUT + folder + '/' + file + bust, real: true, ax: a.ax, ay: a.ay, res: a.res || 1.5 }
        : { url: ART_OUT + folder + '/' + file + bust, real: true, auto: true };
    } else if (ph && ph[key]) {
      entries[key] = { url: PH + file + bust, real: false, ...ph[key] };
    }
  }
  return { pos, info, fit, entries, audio: audioList, phMeta: ph || {} };
}

export function phUrl(key) {
  return BUILT ? new URL('assets/placeholders/' + key + '.png', location.href).href : PH + key + '.png';
}
