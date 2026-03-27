// import Image from "next/image";
// import personIcon from "@public/icons/person-vector.svg";
// import scheduleIcon from "@public/icons/schedule-icon.svg";

// type Props = {
//   isNotificationOpen: boolean;
// };

// const NotificationModal = ({ isNotificationOpen }: Props) => (
//   <>
//     {isNotificationOpen ? (
//       <div className="absolute top-full left-[50%] mt-3 w-74 -translate-x-1/2 overflow-hidden rounded-md bg-white shadow-lg">
//         <div className="relative px-5 py-4">
//           <div className="absolute top-[-6px] left-[50%] size-[11.8px] -translate-x-1/2 rotate-45 bg-white" />

//           <h2 className="pt-[15px] font-jost font-medium text-[#1800AD] text-[24px] leading-[100%]">
//             Notifications
//           </h2>
//           <div className="flex flex-col">
//             <div className="flex gap-[12px] pt-[13px]">
//               <div className="shrink-0">
//                 <div className="flex items-center justify-center rounded-sm bg-blue-100">
//                   <Image alt="" className="bg-[#6254B417]/9" src={personIcon} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-jost text-[#2C3A61] text-[13px] leading-[15px]">
//                   Your custom package has been approved by admin, to complete
//                 </p>
//                 <button
//                   className="mt-1.5 rounded-sm bg-[#FE6B35] px-3 py-1 text-[11px] text-white"
//                   type="button"
//                 >
//                   Pay now
//                 </button>
//                 <p className="pt-[4px] font-jost text-[#6254B4] text-[11px] leading-[100%]">
//                   10 minutes ago
//                 </p>
//               </div>
//             </div>

//             <div className="flex gap-[12px] pt-[13px]">
//               <div className="shrink-0">
//                 <div className="flex items-center justify-center rounded-sm bg-purple-100">
//                   <Image alt="" src={scheduleIcon} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-jost text-[#2C3A61] text-[13px] leading-[15px]">
//                   You have new appointment request received from Mohammed Ali.
//                 </p>
//                 <p className="mt-1 text-[#999999] text-[11px]">Yesterday</p>
//               </div>
//             </div>

//             <div className="flex gap-[12px] pt-[13px]">
//               <div className="shrink-0">
//                 <div className="flex items-center justify-center rounded-[4px] bg-blue-100">
//                   <Image alt="" src={personIcon} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-jost text-[#2C3A61] text-[13px] leading-[15px]">
//                   You have new appointment request received from Mohammed Ali.
//                 </p>
//                 <p className="mt-1 text-[#999999] text-[11px]">Yesterday</p>
//               </div>
//             </div>

//             <div className="flex gap-[12px] pt-[13px]">
//               <div className="shrink-0">
//                 <div className="flex items-center justify-center rounded-[4px] bg-purple-100">
//                   <Image alt="" src={scheduleIcon} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-jost text-[#2C3A61] text-[13px] leading-[15px]">
//                   You have new appointment request received from Mohammed Ali.
//                 </p>
//                 <p className="mt-1 text-[#999999] text-[11px]">8 hours ago</p>
//               </div>
//             </div>

//             <div className="flex gap-[12px] pt-[13px]">
//               <div className="shrink-0">
//                 <div className="flex items-center justify-center rounded-[4px] bg-blue-100">
//                   <Image alt="" src={personIcon} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <p className="font-jost text-[#2C3A61] text-[13px] leading-[15px]">
//                   You have new visit schedule received from Allan Mclaren.
//                 </p>
//                 <p className="mt-1 text-[#999999] text-[11px]">2 days ago</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     ) : null}
//   </>
// );

// export default NotificationModal;
