1.
Whenever a customer wants to order a specific product that doesn't have the stock, like for example we have 10 products  with m-size but the customer is 20 pics. So it tells that we have only 10 pieces You order highest pieces 

Then if the customer replied something like that, "Okay, then order 10," or "Order 5," or "Order at least one," the AI again asks the full customer details like name, phone number, and this type of things.

So we need to fix this issue. Rather the AI should work some things like that It saves the information the name phone number address and everything Just it needs to update like whenever someone wants to order specific pieces of product that don't exist in a stock then it should save all the details except the amount of product then it asked order within this range like for example if 10 is stuck then one to and after it then it should update and go with next.

2.
 Meta Graph API Rate Limiting & Multi-tenant Quota Management
Status: Awaiting Implementation
Priority: High (Scaling Risk)
Component: Backend / Webhook Handler / Messaging Service
🔴 Problem Description
As a multi-tenant SaaS, Autex integrates multiple Facebook Pages. Meta enforces Business Use Case (BUC) Rate Limits on the pages_messaging permission. The limit is calculated as:
Calls within 24 hours = 4800 * Number of Engaged Users.
Technical Risks:
Rate Limit Exhaustion (Error 32/80001): High-traffic pages (spikes during sales/ads) can exhaust their 24-hour quota, causing the AI bot to stop responding.
Bot Loops: Improperly handled webhooks or recursive message triggers can consume the quota in minutes.
Synchronous Failure: Directly calling the Facebook Send API within the webhook request-response cycle leads to timeouts and "unhealthy" status from Meta's perspective if the API is throttled.
✅ Technical Solutions (To be implemented by AI Agent)
Header-Based Monitoring:
Parse the X-Business-Use-Case-Usage HTTP header from every Meta API response.
Extract call_count, total_cputime, and total_time percentages.
Action: Store these metrics in the page_connections table in Supabase to track health per tenant.
Asynchronous Message Queueing:
Logic: Webhook receives message -> Push to a Queue (e.g., Supabase Edge Functions + pg_net or an external Redis/BullMQ) -> Respond 200 OK to Meta immediately.
Benefit: Decouples message processing from API limits and prevents webhook timeouts.
Exponential Backoff Retry Strategy:
Implement a retry mechanism for failed API calls.
If Error Code 32 or 80001 is received, wait for n * 2 minutes before retrying.
Stop retrying if the quota is > 95% used to avoid permanent app suspension.
Rate Limit Awareness in UI:
If a specific tenant's call_count > 80%, trigger a flag in the seller_dashboard UI to warn the user about high traffic and potential delays.
Idempotency & Deduplication:
Check mid (Message ID) from Meta webhooks against a cache/DB to ensure the AI doesn't respond twice to the same message, saving 50% of the quota in duplicate delivery cases.
Note for AI Editor: When implementing, prioritize the Webhook Response Speed (200 OK) and the Exponential Backoff logic in the messaging service. Use the X-Business-Use-Case-Usage header as the primary data source for throttling logic.