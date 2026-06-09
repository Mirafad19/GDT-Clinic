import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messages as initial, physiotherapist } from "@/lib/mock-data";
import { Paperclip, Send } from "lucide-react";

export const Route = createFileRoute("/patient/messages")({
  component: MessagesPage,
});

function MessagesPage() {
  const [list, setList] = useState(initial);
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    setList((l) => [...l, { from: "You", time: "Just now", text, own: true }]);
    setText("");
  };

  return (
    <div className="mx-auto flex max-w-3xl flex-col">
      <div className="mb-4">
        <h1 className="font-display text-3xl">Messages</h1>
        <p className="text-sm text-muted-foreground">Secure thread with {physiotherapist.name}</p>
      </div>

      <Card className="flex h-[65vh] flex-col shadow-card">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {list.map((m, i) => (
            <div key={i} className={`flex ${m.own ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.own ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {!m.own && <p className="mb-0.5 text-[11px] font-medium opacity-70">{m.from}</p>}
                <p>{m.text}</p>
                <p className={`mt-1 text-[10px] ${m.own ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-border p-3">
          <Button variant="ghost" size="icon"><Paperclip className="h-4 w-4" /></Button>
          <Input
            placeholder="Write a message…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
          />
          <Button onClick={send} size="icon"><Send className="h-4 w-4" /></Button>
        </div>
      </Card>
    </div>
  );
}
