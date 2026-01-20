"use client";

import { useState } from "react";
import { CreditCard, CheckCircle, XCircle, RefreshCw } from "lucide-react";

export function BinMasterInterface() {
    const [input, setInput] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [meta, setMeta] = useState("");

    // Implementation of Luhn Algorithm (Mod 10)
    function validateLuhn(number: string) {
        const digits = number.replace(/\D/g, "");
        let sum = 0;
        let shouldDouble = false;

        for (let i = digits.length - 1; i >= 0; i--) {
            let digit = parseInt(digits.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    }

    function handleCheck() {
        const valid = validateLuhn(input);
        setIsValid(valid);

        // Simple BIN lookup simulation
        if (input.startsWith("4")) setMeta("VISA (Test)");
        else if (input.startsWith("5")) setMeta("MasterCard (Test)");
        else if (input.startsWith("3")) setMeta("AMEX (Test)");
        else setMeta("Unknown Issuer");
    }

    function generateValid() {
        // Generates a mock VISA starting with 4242
        let prefix = "424242424242424";
        for (let i = 0; i <= 9; i++) {
            if (validateLuhn(prefix + i)) {
                setInput(prefix + i);
                setIsValid(null); // Reset validation state until checked
                break;
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="bg-surface border border-surface-border p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-accent" /> Algorithmic Validator
                </h3>

                <div className="flex gap-2 mb-4">
                    <input
                        value={input}
                        onChange={(e) => {
                            if (e.target.value.length <= 19) setInput(e.target.value);
                            setIsValid(null);
                        }}
                        placeholder="0000 0000 0000 0000"
                        className="flex-1 bg-black border border-surface-border rounded-xl px-4 py-3 font-mono text-lg tracking-widest focus:border-primary outline-none"
                    />
                    <button onClick={generateValid} className="p-3 bg-white/5 rounded-xl text-muted hover:text-white" title="Generate Test Number">
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>

                <button
                    onClick={handleCheck}
                    className="w-full bg-accent text-black font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors"
                >
                    VERIFY CHECKSUM
                </button>
            </div>

            {isValid !== null && (
                <div className={`p-6 rounded-2xl flex items-center gap-4 border ${isValid ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {isValid ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                    <div>
                        <h4 className="font-bold text-lg">{isValid ? "Mathematically Valid" : "Invalid Checksum"}</h4>
                        <p className="text-xs opacity-80">{isValid ? "Passes Luhn Mod-10 Check" : "Failed Luhn Mod-10 Check"}</p>
                        {isValid && <p className="text-xs mt-1 font-mono text-white/50">{meta}</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
