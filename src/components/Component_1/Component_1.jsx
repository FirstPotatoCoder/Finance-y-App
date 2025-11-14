import './Component_1.css';

export default function Component_1() {

    return (
        <div className="form-container">
            <h2>FormData Upload Example</h2>
            
            <form>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" required />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </div>

                <div>
                    <label>File:</label>
                    <input type="file" name="file" />
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}