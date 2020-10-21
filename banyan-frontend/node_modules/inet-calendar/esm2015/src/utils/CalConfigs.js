/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export let CalConfigs = [
    {
        name: 'DATE_TIME_FORMAT',
        value: 'DD/MM/YYYY HH:mm',
        description: 'Định dạng hiển thị ngày và thời gian'
    },
    {
        name: 'DATE_FORMAT',
        value: 'DD/MM/YYYY',
        description: 'Định dạng hiển thị ngày'
    },
    {
        name: 'TIME_FORMAT',
        value: 'HH:mm',
        description: 'Định dạng hiển thị thời gian'
    },
    {
        name: 'TIME_NEW_UPDATE',
        value: '12',
        description: 'Thời gian hiển thị lịch mới cập nhật: giờ'
    },
    {
        name: 'NOTE_LAST_UPDATE',
        value: true,
        description: 'Hiển thị thời gian sửa đổi cuối cùng: true | false'
    },
    {
        name: 'EVENT_BETWEEN_UNIT',
        value: true,
        description: 'Lịch giữa các đơn vị: true | false'
    },
    {
        name: 'PUBLISH_VIEW',
        value: 'date',
        description: '[Trang ban hành] Chế độ hiển thị mặc định: week | date'
    },
    {
        name: 'TV_VIEW',
        value: 'date',
        description: '[Trang tivi] Chế độ hiển thị: week | date'
    },
    {
        name: 'TV_TRANS_VELOCITY',
        value: '30',
        description: '[Trang tivi] Tốc độ chạy của lịch trên mỗi pixcel - millisecond'
    },
    {
        name: 'EMBED_VIEW',
        value: 'date',
        description: '[Trang nhúng] Chế độ hiển thị mặc định: week | date'
    },
    {
        name: 'EMBED_VIEW_PAST',
        value: true,
        description: '[Trang nhúng] Hiển thị những lịch đã diễn ra: true | false'
    },
    {
        name: 'PERSON_VIEW',
        value: 'listWeek',
        description: '[Trang lịch] Chế độ hiển thị mặc định: agendaWeek | agendaDay | listWeek'
    },
    {
        name: 'PERSON_CREATE_TYPE',
        value: 'COMMUNITY',
        description: '[Trang lịch] Loại lịch mặc định khi tạo: COMMUNITY (cộng đồng) | ORGANIZATION (nội bộ)'
    },
    {
        name: 'INVITATION_SUPPORT',
        value: true,
        description: 'Hỗ trợ thư mời hợp'
    },
    // Department
    {
        name: 'DEPARTMENT_VIEW_OTHER',
        value: true,
        description: 'Xem lịch của phòng ban khác: true'
    },
    {
        name: 'DEPARTMENT_APPROVE_OTHER',
        value: false,
        description: 'Duyệt lịch của phòng ban khác: false'
    },
    {
        name: 'CAR_TYPE_CREATE',
        value: 'COMMUNITY',
        description: 'Loại lịch mặc định khi tạo lịch xe: COMMUNITY | ORGANIZATION'
    },
    {
        name: 'CALENDAR_INCLUDE_CAR',
        value: 'false',
        description: 'Hiển thị lịch bao gồm lich xe'
    },
    {
        name: 'EDIT_EVENT_PAST',
        value: false,
        description: 'Cho phép cập nhật nội dung lịch đã diễn ra: false'
    },
    {
        name: 'PERSONAL_CAN_PUBLISH',
        value: false,
        description: '[Lịch cá nhân] Cho phép ban hành: false'
    },
    {
        name: 'PEOPLE_EVENT_ENABLE',
        value: false,
        description: 'Cho phép tạo lịch tiếp dân'
    },
    {
        name: 'PERSONAL_EVENT_ENABLE',
        value: false,
        description: 'Cho phép tạo lịch cá nhân'
    },
    {
        name: 'CAR_EVENT_ENABLE',
        value: false,
        description: 'Cho phép tạo lịch xe'
    },
    {
        name: 'ATTENDEE_DISPLAY_MAX_LENGTH',
        value: '0',
        description: 'Độ dài hiển thị tối đa của thành phần'
    },
    {
        name: 'VIEW_BY_LEADER',
        value: true,
        description: 'Xem lịch theo danh sách lãnh đạo'
    },
    {
        name: 'MOBILE_VIEW_BY_LEADER',
        value: false,
        description: '[Mobile] Mặc định xem lịch theo danh sách lãnh đạo'
    },
    {
        name: 'MOBILE_VIEW_BY_LEADER_ENABLE',
        value: false,
        description: '[Mobile] Xem lịch theo danh sách lãnh đạo'
    },
    {
        name: 'PUBLISH_EVENT_AFTER_CREATE',
        value: false,
        description: 'Ban hành lịch sau khi tạo'
    },
    {
        name: 'CHECK_DUPLICATE_BEFORE_PUBLISH',
        value: false,
        description: 'Kiểm tra lịch trùng trước khi ban hành'
    },
    {
        name: 'SUBJECT_DISPLAY_MAX_LENGTH',
        value: '0',
        description: 'Độ dài hiển thị tối đa của nội dung lịch'
    },
    {
        name: 'PREFIX_ATTENDEE_NAME',
        value: '',
        description: 'Tiền tố hiển thị trước tên người dùng khi tạo lịch'
    },
    {
        name: 'WORK_TIME_START',
        value: '7:00',
        description: 'Thời gian bắt đầu làm việc'
    },
    {
        name: 'WORK_TIME_END',
        value: '17:00',
        description: 'Thời gian kết thúc làm việc'
    },
    {
        name: 'NOTIFY_TO_ATTENDEE_ENABLE',
        value: 'false',
        description: 'Cho phép người duyệt lịch gửi thông báo nhắc nhở cho người nhận'
    },
];
/**
 * @record
 */
export function CalConfigItem() { }
if (false) {
    /** @type {?} */
    CalConfigItem.prototype.name;
    /** @type {?} */
    CalConfigItem.prototype.value;
    /** @type {?|undefined} */
    CalConfigItem.prototype.description;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsQ29uZmlncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2luZXQtY2FsZW5kYXIvIiwic291cmNlcyI6WyJzcmMvdXRpbHMvQ2FsQ29uZmlncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE1BQU0sS0FBSyxVQUFVLEdBQW9CO0lBQ3JDO1FBQ0ksSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixLQUFLLEVBQUUsa0JBQWtCO1FBQ3pCLFdBQVcsRUFBRSxzQ0FBc0M7S0FDdEQ7SUFDRDtRQUNJLElBQUksRUFBRSxhQUFhO1FBQ25CLEtBQUssRUFBRSxZQUFZO1FBQ25CLFdBQVcsRUFBRSx5QkFBeUI7S0FDekM7SUFDRDtRQUNJLElBQUksRUFBRSxhQUFhO1FBQ25CLEtBQUssRUFBRSxPQUFPO1FBQ2QsV0FBVyxFQUFFLDhCQUE4QjtLQUM5QztJQUNEO1FBQ0ksSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixLQUFLLEVBQUUsSUFBSTtRQUNYLFdBQVcsRUFBRSwyQ0FBMkM7S0FDM0Q7SUFDRDtRQUNJLElBQUksRUFBRSxrQkFBa0I7UUFDeEIsS0FBSyxFQUFFLElBQUk7UUFDWCxXQUFXLEVBQUUsb0RBQW9EO0tBQ3BFO0lBQ0Q7UUFDSSxJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLEtBQUssRUFBRSxJQUFJO1FBQ1gsV0FBVyxFQUFFLG9DQUFvQztLQUNwRDtJQUVEO1FBQ0ksSUFBSSxFQUFFLGNBQWM7UUFDcEIsS0FBSyxFQUFFLE1BQU07UUFDYixXQUFXLEVBQUUsd0RBQXdEO0tBQ3hFO0lBRUQ7UUFDSSxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsV0FBVyxFQUFFLDJDQUEyQztLQUMzRDtJQUNEO1FBQ0ksSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixLQUFLLEVBQUUsSUFBSTtRQUNYLFdBQVcsRUFBRSxpRUFBaUU7S0FDakY7SUFHRDtRQUNJLElBQUksRUFBRSxZQUFZO1FBQ2xCLEtBQUssRUFBRSxNQUFNO1FBQ2IsV0FBVyxF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O1FBQ2pDLEtBQUssRUFBRSxPQUFPO1FBQ2QsV0FBVyxFQUFFLGlFQUFpRTtLQUNqRjtDQUNKOzs7O0FBRUQsbUNBSUM7OztJQUhHLDZCQUFZOztJQUNaLDhCQUFVOztJQUNWLG9DQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBsZXQgQ2FsQ29uZmlnczogQ2FsQ29uZmlnSXRlbVtdID0gW1xuICAgIHtcbiAgICAgICAgbmFtZTogJ0RBVEVfVElNRV9GT1JNQVQnLFxuICAgICAgICB2YWx1ZTogJ0REL01NL1lZWVkgSEg6bW0nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ8SQ4buLbmggZOG6oW5nIGhp4buDbiB0aOG7iyBuZ8OgeSB2w6AgdGjhu51pIGdpYW4nXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdEQVRFX0ZPUk1BVCcsXG4gICAgICAgIHZhbHVlOiAnREQvTU0vWVlZWScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnxJDhu4tuaCBk4bqhbmcgaGnhu4NuIHRo4buLIG5nw6B5J1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnVElNRV9GT1JNQVQnLFxuICAgICAgICB2YWx1ZTogJ0hIOm1tJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICfEkOG7i25oIGThuqFuZyBoaeG7g24gdGjhu4sgdGjhu51pIGdpYW4nXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdUSU1FX05FV19VUERBVEUnLFxuICAgICAgICB2YWx1ZTogJzEyJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaOG7nWkgZ2lhbiBoaeG7g24gdGjhu4sgbOG7i2NoIG3hu5tpIGPhuq1wIG5o4bqtdDogZ2nhu50nXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdOT1RFX0xBU1RfVVBEQVRFJyxcbiAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSGnhu4NuIHRo4buLIHRo4budaSBnaWFuIHPhu61hIMSR4buVaSBjdeG7kWkgY8O5bmc6IHRydWUgfCBmYWxzZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0VWRU5UX0JFVFdFRU5fVU5JVCcsXG4gICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0zhu4tjaCBnaeG7r2EgY8OhYyDEkcahbiB24buLOiB0cnVlIHwgZmFsc2UnXG4gICAgfSxcblxuICAgIHtcbiAgICAgICAgbmFtZTogJ1BVQkxJU0hfVklFVycsXG4gICAgICAgIHZhbHVlOiAnZGF0ZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnW1RyYW5nIGJhbiBow6BuaF0gQ2jhur8gxJHhu5kgaGnhu4NuIHRo4buLIG3hurdjIMSR4buLbmg6IHdlZWsgfCBkYXRlJ1xuICAgIH0sXG5cbiAgICB7XG4gICAgICAgIG5hbWU6ICdUVl9WSUVXJyxcbiAgICAgICAgdmFsdWU6ICdkYXRlJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdbVHJhbmcgdGl2aV0gQ2jhur8gxJHhu5kgaGnhu4NuIHRo4buLOiB3ZWVrIHwgZGF0ZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1RWX1RSQU5TX1ZFTE9DSVRZJyxcbiAgICAgICAgdmFsdWU6ICczMCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnW1RyYW5nIHRpdmldIFThu5FjIMSR4buZIGNo4bqheSBj4bunYSBs4buLY2ggdHLDqm4gbeG7l2kgcGl4Y2VsIC0gbWlsbGlzZWNvbmQnXG4gICAgfSxcblxuXG4gICAge1xuICAgICAgICBuYW1lOiAnRU1CRURfVklFVycsXG4gICAgICAgIHZhbHVlOiAnZGF0ZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnW1RyYW5nIG5ow7puZ10gQ2jhur8gxJHhu5kgaGnhu4NuIHRo4buLIG3hurdjIMSR4buLbmg6IHdlZWsgfCBkYXRlJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnRU1CRURfVklFV19QQVNUJyxcbiAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnW1RyYW5nIG5ow7puZ10gSGnhu4NuIHRo4buLIG5o4buvbmcgbOG7i2NoIMSRw6MgZGnhu4VuIHJhOiB0cnVlIHwgZmFsc2UnXG4gICAgfSxcblxuICAgIHtcbiAgICAgICAgbmFtZTogJ1BFUlNPTl9WSUVXJyxcbiAgICAgICAgdmFsdWU6ICdsaXN0V2VlaycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnW1RyYW5nIGzhu4tjaF0gQ2jhur8gxJHhu5kgaGnhu4NuIHRo4buLIG3hurdjIMSR4buLbmg6IGFnZW5kYVdlZWsgfCBhZ2VuZGFEYXkgfCBsaXN0V2VlaydcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1BFUlNPTl9DUkVBVEVfVFlQRScsXG4gICAgICAgIHZhbHVlOiAnQ09NTVVOSVRZJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdbVHJhbmcgbOG7i2NoXSBMb+G6oWkgbOG7i2NoIG3hurdjIMSR4buLbmgga2hpIHThuqFvOiBDT01NVU5JVFkgKGPhu5luZyDEkeG7k25nKSB8IE9SR0FOSVpBVElPTiAobuG7mWkgYuG7mSknXG4gICAgfSxcblxuICAgIHtcbiAgICAgICAgbmFtZTogJ0lOVklUQVRJT05fU1VQUE9SVCcsXG4gICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0jhu5cgdHLhu6MgdGjGsCBt4budaSBo4bujcCdcbiAgICB9LFxuXG4gICAgLy8gRGVwYXJ0bWVudFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0RFUEFSVE1FTlRfVklFV19PVEhFUicsXG4gICAgICAgIHZhbHVlOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1hlbSBs4buLY2ggY+G7p2EgcGjDsm5nIGJhbiBraMOhYzogdHJ1ZSdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ0RFUEFSVE1FTlRfQVBQUk9WRV9PVEhFUicsXG4gICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdEdXnhu4d0IGzhu4tjaCBj4bunYSBwaMOybmcgYmFuIGtow6FjOiBmYWxzZSdcbiAgICB9LFxuXG4gICAge1xuICAgICAgICBuYW1lOiAnQ0FSX1RZUEVfQ1JFQVRFJyxcbiAgICAgICAgdmFsdWU6ICdDT01NVU5JVFknLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0xv4bqhaSBs4buLY2ggbeG6t2MgxJHhu4tuaCBraGkgdOG6oW8gbOG7i2NoIHhlOiBDT01NVU5JVFkgfCBPUkdBTklaQVRJT04nXG4gICAgfSxcblxuICAgIHtcbiAgICAgICAgbmFtZTogJ0NBTEVOREFSX0lOQ0xVREVfQ0FSJyxcbiAgICAgICAgdmFsdWU6ICdmYWxzZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSGnhu4NuIHRo4buLIGzhu4tjaCBiYW8gZ+G7k20gbGljaCB4ZSdcbiAgICB9LFxuXG4gICAge1xuICAgICAgICBuYW1lOiAnRURJVF9FVkVOVF9QQVNUJyxcbiAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0NobyBwaMOpcCBj4bqtcCBuaOG6rXQgbuG7mWkgZHVuZyBs4buLY2ggxJHDoyBkaeG7hW4gcmE6IGZhbHNlJ1xuICAgIH0sXG5cbiAgICB7XG4gICAgICAgIG5hbWU6ICdQRVJTT05BTF9DQU5fUFVCTElTSCcsXG4gICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdbTOG7i2NoIGPDoSBuaMOibl0gQ2hvIHBow6lwIGJhbiBow6BuaDogZmFsc2UnXG4gICAgfSxcblxuICAgIHtcbiAgICAgICAgbmFtZTogJ1BFT1BMRV9FVkVOVF9FTkFCTEUnLFxuICAgICAgICB2YWx1ZTogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQ2hvIHBow6lwIHThuqFvIGzhu4tjaCB0aeG6v3AgZMOibidcbiAgICB9LFxuXG4gICAge1xuICAgICAgICBuYW1lOiAnUEVSU09OQUxfRVZFTlRfRU5BQkxFJyxcbiAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0NobyBwaMOpcCB04bqhbyBs4buLY2ggY8OhIG5ow6JuJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnQ0FSX0VWRU5UX0VOQUJMRScsXG4gICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdDaG8gcGjDqXAgdOG6oW8gbOG7i2NoIHhlJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnQVRURU5ERUVfRElTUExBWV9NQVhfTEVOR1RIJyxcbiAgICAgICAgdmFsdWU6ICcwJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICfEkOG7mSBkw6BpIGhp4buDbiB0aOG7iyB04buRaSDEkWEgY+G7p2EgdGjDoG5oIHBo4bqnbidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1ZJRVdfQllfTEVBREVSJyxcbiAgICAgICAgdmFsdWU6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnWGVtIGzhu4tjaCB0aGVvIGRhbmggc8OhY2ggbMOjbmggxJHhuqFvJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTU9CSUxFX1ZJRVdfQllfTEVBREVSJyxcbiAgICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1tNb2JpbGVdIE3hurdjIMSR4buLbmggeGVtIGzhu4tjaCB0aGVvIGRhbmggc8OhY2ggbMOjbmggxJHhuqFvJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTU9CSUxFX1ZJRVdfQllfTEVBREVSX0VOQUJMRScsXG4gICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdbTW9iaWxlXSBYZW0gbOG7i2NoIHRoZW8gZGFuaCBzw6FjaCBsw6NuaCDEkeG6oW8nXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdQVUJMSVNIX0VWRU5UX0FGVEVSX0NSRUFURScsXG4gICAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdCYW4gaMOgbmggbOG7i2NoIHNhdSBraGkgdOG6oW8nXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdDSEVDS19EVVBMSUNBVEVfQkVGT1JFX1BVQkxJU0gnLFxuICAgICAgICB2YWx1ZTogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnS2nhu4NtIHRyYSBs4buLY2ggdHLDuW5nIHRyxrDhu5tjIGtoaSBiYW4gaMOgbmgnXG4gICAgfSxcbiAgICB7XG4gICAgICAgIG5hbWU6ICdTVUJKRUNUX0RJU1BMQVlfTUFYX0xFTkdUSCcsXG4gICAgICAgIHZhbHVlOiAnMCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnxJDhu5kgZMOgaSBoaeG7g24gdGjhu4sgdOG7kWkgxJFhIGPhu6dhIG7hu5lpIGR1bmcgbOG7i2NoJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnUFJFRklYX0FUVEVOREVFX05BTUUnLFxuICAgICAgICB2YWx1ZTogJycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGnhu4FuIHThu5EgaGnhu4NuIHRo4buLIHRyxrDhu5tjIHTDqm4gbmfGsOG7nWkgZMO5bmcga2hpIHThuqFvIGzhu4tjaCdcbiAgICB9LFxuICAgIHtcbiAgICAgICAgbmFtZTogJ1dPUktfVElNRV9TVEFSVCcsXG4gICAgICAgIHZhbHVlOiAnNzowMCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnVGjhu51pIGdpYW4gYuG6r3QgxJHhuqd1IGzDoG0gdmnhu4djJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnV09SS19USU1FX0VORCcsXG4gICAgICAgIHZhbHVlOiAnMTc6MDAnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1Ro4budaSBnaWFuIGvhur90IHRow7pjIGzDoG0gdmnhu4djJ1xuICAgIH0sXG4gICAge1xuICAgICAgICBuYW1lOiAnTk9USUZZX1RPX0FUVEVOREVFX0VOQUJMRScsXG4gICAgICAgIHZhbHVlOiAnZmFsc2UnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0NobyBwaMOpcCBuZ8aw4budaSBkdXnhu4d0IGzhu4tjaCBn4butaSB0aMO0bmcgYsOhbyBuaOG6r2Mgbmjhu58gY2hvIG5nxrDhu51pIG5o4bqtbidcbiAgICB9LFxuXTtcblxuZXhwb3J0IGludGVyZmFjZSBDYWxDb25maWdJdGVtIHtcbiAgICBuYW1lOiBzdHJpbmdcbiAgICB2YWx1ZTogYW55XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmdcbn1cbiJdfQ==