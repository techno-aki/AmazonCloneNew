package com.ecom.ProductCatalog.service;

import com.ecom.ProductCatalog.model.Product;
import com.ecom.ProductCatalog.repository.ProductRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.Map;

@Service
public class RazorpayService {

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecret;

    private final ProductRepository productRepository;

    public RazorpayService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Map<String, Object> createOrder(Long productId) throws RazorpayException {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Price DB se, paise me convert (699.99 -> 69999)
        BigDecimal price = new BigDecimal(String.valueOf(product.getPrice()));
        long paise = price.multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .longValueExact();

        RazorpayClient client = new RazorpayClient(apiKey, apiSecret);
        JSONObject req = new JSONObject();
        req.put("amount", paise);
        req.put("currency", "INR");
        req.put("receipt", "rcpt_" + productId + "_" + System.currentTimeMillis());

        Order order = client.orders.create(req);

        Map<String, Object> res = new HashMap<>();
        res.put("orderId", order.get("id"));
        res.put("amount", order.get("amount"));
        res.put("currency", order.get("currency"));
        res.put("key", apiKey);   // sirf public key frontend ko jati hai
        return res;
    }

    public boolean verifySignature(String orderId, String paymentId, String signature) {
        try {
            JSONObject data = new JSONObject();
            data.put("razorpay_order_id", orderId);
            data.put("razorpay_payment_id", paymentId);
            data.put("razorpay_signature", signature);
            return Utils.verifyPaymentSignature(data, apiSecret);
        } catch (RazorpayException e) {
            return false;
        }
    }
}
