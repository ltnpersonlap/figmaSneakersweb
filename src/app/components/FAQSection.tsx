import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-5xl mx-auto px-4 md:px-10 py-16" aria-labelledby="faq-heading">
      <div className="text-center mb-10">
        <h2 id="faq-heading" className="text-gray-900" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em" }}>
          Câu hỏi thường gặp
        </h2>
        <p className="text-gray-600 mt-3 text-base max-w-2xl mx-auto">
          Tìm câu trả lời nhanh chóng cho các thắc mắc phổ biến về sản phẩm và dịch vụ của ZayZepZone.
        </p>
      </div>

      <div className="space-y-4" role="list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{
                background: "white",
                border: `2px solid ${isOpen ? "#0077CC" : "#E8F0FE"}`,
                boxShadow: isOpen ? "0 6px 20px rgba(0,119,204,0.15)" : "0 2px 8px rgba(0,0,0,0.05)",
              }}
              role="listitem"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="font-bold text-gray-800 pr-4" style={{ fontSize: "1.05rem" }}>
                  {faq.question}
                </h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0077CC"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="flex-shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-5 pb-5"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p className="text-gray-600 leading-relaxed text-sm border-t pt-4" style={{ borderColor: "#E8F0FE" }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Default FAQ data for ZayZepZone
export const DEFAULT_FAQS: FAQ[] = [
  {
    question: "Làm sao để biết size giày nào phù hợp với mình?",
    answer: "Bạn có thể tham khảo bảng size chuẩn của chúng tôi hoặc sử dụng công cụ đo size online. Nếu bạn đo được chiều dài bàn chân (cm), hãy cộng thêm 0.5-1cm để chọn size thoải mái. Ví dụ: Chân 25cm → Chọn size 40 hoặc 41. Nếu vẫn chưa chắc chắn, hãy liên hệ hotline để được tư vấn trực tiếp.",
  },
  {
    question: "ZayZepZone có ship COD và giao nhanh không?",
    answer: "Có! Chúng tôi hỗ trợ COD (thanh toán khi nhận hàng) toàn quốc. Đặc biệt, với khách hàng tại TP.HCM, chúng tôi có dịch vụ giao nhanh 2 giờ nội thành. Các tỉnh thành khác giao hàng trong 2-3 ngày làm việc. Phí ship được tính theo khoảng cách và khối lượng đơn hàng.",
  },
  {
    question: "Chính sách đổi trả của ZayZepZone như thế nào?",
    answer: "Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày nhận hàng nếu sản phẩm còn nguyên tem, chưa qua sử dụng, và không có dấu hiệu hư hỏng. Khách hàng chỉ cần liên hệ hotline hoặc fanpage để được hướng dẫn quy trình đổi trả. Lưu ý: Sản phẩm sale off có thể không áp dụng đổi trả tùy chính sách từng đợt.",
  },
  {
    question: "Giày của ZayZepZone có chính hãng không?",
    answer: "100% sản phẩm tại ZayZepZone đều là hàng chính hãng, có tem kiểm định và bảo hành chính thức từ nhà phân phối. Chúng tôi cam kết hoàn tiền 200% nếu phát hiện hàng fake. Mỗi đôi giày đều đi kèm hóa đơn VAT và thẻ bảo hành để bạn yên tâm sử dụng.",
  },
  {
    question: "Tôi có thể mua trả góp không?",
    answer: "Có! ZayZepZone hỗ trợ trả góp 0% lãi suất qua các đối tác như Home Credit, FE Credit, và các ví điện tử (Momo, ZaloPay, ShopeePay). Điều kiện: Đơn hàng từ 1 triệu đồng trở lên, có CMND/CCCD và thẻ ATM. Thủ tục đơn giản, duyệt nhanh trong 15 phút.",
  },
  {
    question: "Làm sao để theo dõi đơn hàng của mình?",
    answer: "Sau khi đặt hàng thành công, bạn sẽ nhận được mã đơn hàng qua SMS hoặc email. Bạn có thể tra cứu trạng thái đơn hàng bằng cách: (1) Truy cập trang 'Đơn hàng của tôi' trên website, (2) Nhắn tin qua fanpage kèm mã đơn, hoặc (3) Gọi hotline để được hỗ trợ trực tiếp. Chúng tôi cập nhật trạng thái đơn hàng realtime.",
  },
];
